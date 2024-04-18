import * as t from '@babel/types';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

import { toEqual } from './helpers/toEqual.js';
import { toHaveBeenCalledTimes } from './helpers/toHaveBeenCalledTimes.js';
import { toHaveBeenCalledWith } from './helpers/toHaveBeenCalledWith.js';

export const convertFile = async (code: string) => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  let hasAssertImport = false;

  traverse.default(ast, {
    ImportDeclaration(path: any) {
      if (path.node.source.value.includes('jest')) {
        path.remove();
      }
      if (path.node.source.value === 'node:assert') {
        hasAssertImport = true;
      }
    },
    Program: {
      exit(path: any) {
        if (!hasAssertImport) {
          const assertImportDeclaration = t.importDeclaration(
            [t.importNamespaceSpecifier(t.identifier('assert'))],
            t.stringLiteral('node:assert')
          );
          path.node.body.unshift(assertImportDeclaration);
        }
      },
    },
    CallExpression(path: any) {
      if (
        path.node.callee.object &&
        path.node.callee.property &&
        path.node.callee.object.callee?.name === 'expect'
      ) {
        switch (path.node.callee.property.name) {
          case 'toEqual': {
            const newExpression = toEqual(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toHaveBeenCalledTimes': {
            const assertExpression = toHaveBeenCalledTimes(path);
            path.replaceWith(assertExpression);
            break;
          }
          case 'toHaveBeenCalledWith': {
            const newExpression = toHaveBeenCalledWith(path);
            path.replaceWith(newExpression);
            break;
          }
          default:
            break;
        }
      }
    },
  });

  return generate.default(ast, { retainLines: true }).code;
};
