import type {
  EnumDeclaration,
  ModelDeclaration,
  ModelDeclarationMember,
  PrismaSchema,
} from '@loancrate/prisma-schema-parser';

export const PrismaBaseTypes = {
  BigInt: 'BigInt',
  Boolean: 'Boolean',
  DateTime: 'DateTime',
  Decimal: 'Decimal',
  Float: 'Float',
  Int: 'Int',
  Json: 'Json',
  String: 'String',
} as const;
export type PrismaBaseType
  = (typeof PrismaBaseTypes)[keyof typeof PrismaBaseTypes];

export const TypeScriptNativeType = {
  any: 'any',
  bigint: 'bigint',
  boolean: 'boolean',
  Date: 'Date',
  number: 'number',
  string: 'string',
} as const;
export type TypeScriptNativeType
  = (typeof TypeScriptNativeType)[keyof typeof TypeScriptNativeType];
export const TypeScriptNativeTypes = Object.values(
  TypeScriptNativeType,
) as TypeScriptNativeType[];

const mapPrismaTypeToTs = (prismaType: string): string => {
  const typeMap: Record<string, string> = {
    [PrismaBaseTypes.BigInt]: TypeScriptNativeType.bigint,
    [PrismaBaseTypes.Boolean]: TypeScriptNativeType.boolean,
    [PrismaBaseTypes.DateTime]: TypeScriptNativeType.Date,
    [PrismaBaseTypes.Decimal]: TypeScriptNativeType.number,
    [PrismaBaseTypes.Float]: TypeScriptNativeType.number,
    [PrismaBaseTypes.Int]: TypeScriptNativeType.number,
    [PrismaBaseTypes.Json]: TypeScriptNativeType.any,
    [PrismaBaseTypes.String]: TypeScriptNativeType.string,
  };

  return typeMap[prismaType] || prismaType;
};

/* ---------------------------------- Enum ---------------------------------- */
export interface ParsedEnum {
  name: string;
  values: string[];
}

const parseEnumDeclaration = (declaration: EnumDeclaration): ParsedEnum => {
  const enumValues = declaration.members.reduce((acc, curr) => {
    if (curr.kind === 'enumValue') {
      return [...acc, curr.name.value];
    }

    return acc;
  }, [] as string[]);

  return {
    name: declaration.name.value,
    values: enumValues,
  };
};

export const getEnums = (schema: PrismaSchema): ParsedEnum[] => {
  const enumDeclarations = schema.declarations.filter(
    declaration => declaration.kind === 'enum',
  );

  return enumDeclarations.map(declaration =>
    parseEnumDeclaration(declaration as EnumDeclaration),
  );
};

/* ---------------------------------- Model --------------------------------- */

export interface ParsedModel {
  fields: ParsedModelField[];
  name: string;
}

export interface ParsedModelField {
  isNullable: boolean;
  name: string;
  type: string;
}

const processModelDeclarationMember = (
  member: ModelDeclarationMember,
): null | ParsedModelField => {
  if (member.kind !== 'field') {
    return null;
  }

  switch (member.type.kind) {
    case 'optional': {
      if (member.type.type.kind !== 'typeId') {
        return null;
      }

      return {
        isNullable: true,
        name: member.name.value,
        type: mapPrismaTypeToTs(member.type.type.name.value),
      };
    }

    case 'typeId':
      return {
        isNullable: false,
        name: member.name.value,
        type: mapPrismaTypeToTs(member.type.name.value),
      };

    default:
      return null;
  }
};

const processModelDeclaration = (
  declaration: ModelDeclaration,
): ParsedModel => {
  const result: ParsedModel = {
    fields: [],
    name: declaration.name.value,
  };

  declaration.members.forEach((member) => {
    const parsedMember = processModelDeclarationMember(member);

    if (parsedMember) {
      result.fields.push(parsedMember);
    }
  });

  return result;
};

export const getModels = (schema: PrismaSchema): ParsedModel[] => {
  const result: ParsedModel[] = [];

  schema.declarations.forEach((declaration) => {
    if (declaration.kind !== 'model') {
      return;
    }

    result.push(processModelDeclaration(declaration));
  });

  return result;
};
