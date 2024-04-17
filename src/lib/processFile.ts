import path from 'path';
import fs from 'fs/promises';
import { convertFile } from './convertFile.js';

export const processFile = async (
  inputRoot: string,
  outputRoot: string,
  filePath: string
): Promise<void> => {
  const code = await fs.readFile(filePath, 'utf8');
  const transformedCode = await convertFile(code);

  // Calculate the new file path based on the outputRoot
  const relativePath = path.relative(inputRoot, filePath);
  const newFilePath = path
    .join(outputRoot, relativePath)
    .replace('.spec.', '.test.');

  // Ensure the directory exists
  await fs.mkdir(path.dirname(newFilePath), { recursive: true });

  // Write the transformed file
  await fs.writeFile(newFilePath, transformedCode, 'utf8');
  console.log(`Processed: ${newFilePath}`);
};
