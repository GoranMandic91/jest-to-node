import path from 'path';
import fs from 'fs/promises';

export const walkDirectory = async (
  directory: string,
  source: string,
  output: string,
  callback: (
    inputRoot: string,
    outputRoot: string,
    filePath: string
  ) => Promise<void>
): Promise<void> => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walkDirectory(fullPath, source, output, callback);
    } else if (fullPath.endsWith('.spec.ts')) {
      await callback(source, output, fullPath);
    } else {
      // copy all other files to output directory
      const code = await fs.readFile(fullPath, 'utf8');
      const relativePath = path.relative(source, fullPath);
      const newFilePath = path.join(output, relativePath);
      await fs.mkdir(path.dirname(newFilePath), { recursive: true });
      await fs.writeFile(newFilePath, code, 'utf8');
      console.log('\x1b[36m', `Copied: ${newFilePath}`);
    }
  }
};
