import { camelCase } from 'es-toolkit';
import pluralize from 'pluralize';

export const getEnumFolderMap = (
  modelNames: string[],
  enumNames: string[],
): Map<string, string> => {
  const sortedModelNames = modelNames.sort((a, b) => b.length - a.length);
  const domainFolderNames = sortedModelNames.map(domainName =>
    pluralize(camelCase(domainName)),
  );

  const result = new Map<string, string>();

  for (const enumName of enumNames) {
    const overlapCharCount = new Array<number>(sortedModelNames.length).fill(0);

    for (const [index, modelName] of sortedModelNames.entries()) {
      let i = 0;
      while (
        i < enumName.length
        && i < modelName.length
        && enumName[i] === modelName[i]
      ) {
        overlapCharCount[index]!++;
        i++;
      }
    }

    const maxOverlapCount = Math.max(...overlapCharCount);

    if (maxOverlapCount === 0) {
      result.set(enumName, pluralize(camelCase(enumName)));
      continue;
    }

    const maxOverlapIndex = overlapCharCount.lastIndexOf(maxOverlapCount);
    if (maxOverlapIndex === -1) {
      result.set(enumName, pluralize(camelCase(enumName)));
      continue;
    }

    result.set(enumName, domainFolderNames[maxOverlapIndex]!);
  }

  return result;
};
