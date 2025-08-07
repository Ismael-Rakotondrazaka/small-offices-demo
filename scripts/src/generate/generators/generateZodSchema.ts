import {
  type JsonSchema,
  type JsonSchemaObject,
  jsonSchemaToZod,
} from 'json-schema-to-zod';
import {
  type OptionalKind,
  type PropertySignatureStructure,
  type SourceFile,
  VariableDeclarationKind,
} from 'ts-morph';

import type { ParsedModel, ParsedModelField } from '../utils/prismaParser';

import {
  TypeScriptNativeType,
  TypeScriptNativeTypes,
} from '../utils/prismaParser';

export interface GeneratedZodSchemaOptions {
  excludeFields?: string[];
  isAllOptional?: boolean;
  isAllRequired?: boolean;
  isNativeTypeOnly?: boolean;
  withInferredTypes?: boolean;
  withTypeFirst?: boolean;
}

const createInterfaceProperties = (
  model: ParsedModel,
  options: GeneratedZodSchemaOptions,
): OptionalKind<PropertySignatureStructure>[] => {
  return model.fields
    .filter(
      field =>
        !options?.excludeFields?.includes(field.name)
        && options?.isNativeTypeOnly
        && (TypeScriptNativeTypes as string[]).includes(field.type),
    )
    .map(
      (field): OptionalKind<PropertySignatureStructure> => ({
        hasQuestionToken:
          options.isAllOptional === true || options.isAllRequired === true
            ? false
            : undefined,
        name: field.name,
        type: getTypeScriptType(field),
      }),
    );
};

interface GetZodFromJsonSchemaOptions {
  forceDateStringToCoerceToDate?: boolean;
}

export function generateZodSchema(
  sourceFile: SourceFile,
  model: ParsedModel,
  schemaName: string,
  options?: GeneratedZodSchemaOptions,
) {
  const jsonSchema = createJsonSchema(model, options);
  const zodSchemaString = getZodFromJsonSchema(jsonSchema, {
    forceDateStringToCoerceToDate: true,
  });

  if (options?.withTypeFirst) {
    sourceFile.addInterface({
      isExported: true,
      name: schemaName,
      properties: createInterfaceProperties(model, options),
    });
  }

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        initializer: zodSchemaString,
        name: `${schemaName}Schema`,
        type: options?.withTypeFirst ? `z.ZodType<${schemaName}>` : undefined,
      },
    ],
    isExported: true,
  });

  if (options?.withInferredTypes) {
    sourceFile.addTypeAlias({
      isExported: true,
      name: schemaName,
      type: `z.infer<typeof ${schemaName}Schema>`,
    });
  }
}

const getZodFromJsonSchema = (
  jsonSchema: JsonSchema,
  options?: GetZodFromJsonSchemaOptions,
): string => {
  const zodSchema = jsonSchemaToZod(jsonSchema);

  if (options?.forceDateStringToCoerceToDate) {
    return zodSchema.replaceAll(
      'z.string().datetime({ offset: true })',
      'z.coerce.date()',
    );
  }

  return zodSchema;
};

function createJsonSchema(
  parsedModel: ParsedModel,
  options?: GeneratedZodSchemaOptions,
): JsonSchema {
  const schema: JsonSchema = {
    properties: {},
    required: [],
    type: 'object',
  };

  //   By default, all properties are optionals
  // if (options?.isAllRequired) {
  //   schema.required = true;
  // }

  // if (options?.isAllOptional) {
  //   schema.required = false;
  // }

  for (const field of parsedModel.fields) {
    if (!schema.properties) {
      schema.properties = {};
    }

    if (options?.excludeFields?.includes(field.name)) {
      continue;
    }

    if (
      options?.isNativeTypeOnly
      && !(TypeScriptNativeTypes as string[]).includes(field.type)
    ) {
      continue;
    }

    schema.properties[field.name] = getZodType(field);

    if (options?.isAllOptional) {
      continue;
    }

    if (Array.isArray(schema.required)) {
      schema.required.push(field.name);
    }
    else {
      schema.required = [field.name];
    }
  }

  return schema;
}

function getTypeScriptType(field: ParsedModelField): string {
  return field.isNullable ? `${field.type} | null` : field.type;
}

function getZodType(field: ParsedModelField): JsonSchemaObject {
  const typeMap: Record<string, JsonSchemaObject> = {
    [TypeScriptNativeType.bigint]: { format: 'int64', type: 'integer' },
    [TypeScriptNativeType.boolean]: { type: 'boolean' },
    // ! this will create z.string().datetime({ offset: true }), as date is not a native JSON Schema type
    [TypeScriptNativeType.Date]: { format: 'date-time', type: 'string' },
    [TypeScriptNativeType.number]: { type: 'number' },
    [TypeScriptNativeType.string]: { type: 'string' },
  };

  const zodType = typeMap[field.type] ?? { type: 'any' };

  if (field.isNullable) {
    // zodType.type = [zodType.type as string, "null"];
    zodType.nullable = true;
  }

  return zodType;
}
