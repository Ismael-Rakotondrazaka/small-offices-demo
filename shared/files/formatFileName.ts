import slugify from 'slugify';
import { v7 as uuidv7 } from 'uuid';

const getExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot > 0 && lastDot < fileName.length - 1)
    return fileName.slice(lastDot + 1);
  return '';
};

const getBaseName = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot > 0)
    return fileName.slice(0, lastDot);
  return fileName;
};

export const formatFileName = (fileName: string): string => {
  const extension = getExtension(fileName);
  const base = getBaseName(fileName);
  const slug = slugify(base, { locale: 'fr', lower: true });
  const uuid = uuidv7();
  if (extension)
    return `${slug}__${uuid}.${extension}`;
  return `${slug}__${uuid}`;
};
