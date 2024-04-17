#!/usr/bin/env node
import { processFile } from './lib/processFile.js';
import { walkDirectory } from './lib/walkDirectory.js';

const [, , source, output] = process.argv;

if (!source || !output) {
  console.error('Usage: jest-to-node <source-directory> <output-directory>');
  process.exit(1);
}

const main = async (source: string, output: string) => {
  try {
    await walkDirectory(source, source, output, processFile);
    console.log('All files have been processed.');
  } catch (error) {
    console.error('Error processing files:', error);
  }
};

main(source, output);
