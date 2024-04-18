import * as t from '@babel/types';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

import { toEqual } from './helpers/toEqual.js';
import { toHaveBeenCalledTimes } from './helpers/toHaveBeenCalledTimes.js';
import { toHaveBeenCalledWith } from './helpers/toHaveBeenCalledWith.js';
import { toBe } from './helpers/toBe.js';
import { toMatchObject } from './helpers/toMatchObject.js';
import { toBeNull } from './helpers/toBeNull.js';
import { toBeUndefined } from './helpers/toBeUndefined.js';
import { toThrow } from './helpers/toThrow.js';
import { toBeDefined } from './helpers/toBeDefined.js';
import { toBeFalsy } from './helpers/toBeFalsy.js';
import { toBeInstanceOf } from './helpers/toBeInstanceOf.js';
import { toBeTruthy } from './helpers/toBeTruthy.js';
import { toMatch } from './helpers/toMatch.js';
import { toHaveLength } from './helpers/toHaveLength.js';
import { toHaveBeenCalled } from './helpers/toHaveBeenCalled.js';

const imports = [
  'describe',
  'it',
  'beforeEach',
  'afterEach',
  'beforeAll',
  'afterAll',
];

export const convertFile = async (code: string) => {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'importAssertions'],
  });

  let hasAssertImport = false;
  let uses: Record<string, boolean> = {
    describe: false,
    it: false,
    after: false,
    afterEach: false,
    before: false,
    beforeEach: false,
  };

  traverse.default(ast, {
    ImportDeclaration(path: any) {
      if (path.node?.source.value.includes('jest')) {
        path.remove();
      }
      if (path.node?.source.value === 'node:assert') {
        hasAssertImport = true;
      }
    },
    Program: {
      exit(path: any) {
        //import { describe, it, after, before } from 'node:test';
        const specifiers = [];
        for (const key in uses) {
          if (uses[key]) {
            specifiers.push(
              t.importSpecifier(t.identifier(key), t.identifier(key))
            );
          }
        }
        if (specifiers.length) {
          const importDeclaration = t.importDeclaration(
            specifiers,
            t.stringLiteral('node:test')
          );
          ast.program.body.unshift(importDeclaration);
        }

        //import assert from 'node:assert/strict';
        if (!hasAssertImport) {
          const assertImportDeclaration = t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier('assert'))],
            t.stringLiteral('node:assert/strict')
          );
          path.node.body.unshift(assertImportDeclaration);
        }
      },
    },
    CallExpression(path: any) {
      // handle needed imports
      if (imports.includes(path.node.callee.name)) {
        if (['beforeAll', 'afterAll'].includes(path.node.callee.name)) {
          const name = path.node.callee.name.slice(0, -3);
          uses[name] = true;
          path.node.callee.name = name;
        } else {
          uses[path.node.callee.name] = true;
        }
      }

      // handle expects
      if (
        path.node.callee.object &&
        path.node.callee.property &&
        path.node.callee.object.callee?.name === 'expect'
      ) {
        switch (path.node.callee.property.name) {
          case 'toBe': {
            const newExpression = toBe(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeDefined': {
            const newExpression = toBeDefined(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeFalsy': {
            const newExpression = toBeFalsy(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeInstanceOf': {
            const newExpression = toBeInstanceOf(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeNull': {
            const newExpression = toBeNull(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeTruthy': {
            const newExpression = toBeTruthy(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeUndefined': {
            const newExpression = toBeUndefined(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toEqual': {
            const newExpression = toEqual(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeCalledTimes':
          case 'toHaveBeenCalledTimes': {
            const assertExpression = toHaveBeenCalledTimes(path);
            path.replaceWith(assertExpression);
            break;
          }
          case 'toHaveBeenCalled': {
            const newExpression = toHaveBeenCalled(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toBeCalledWith':
          case 'toHaveBeenCalledWith': {
            const newExpression = toHaveBeenCalledWith(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toHaveBeenNthCalledWith': {
            const newExpression = toHaveBeenCalledWith(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toHaveLength': {
            const newExpression = toHaveLength(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toMatch': {
            const newExpression = toMatch(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toMatchObject': {
            const newExpression = toMatchObject(path);
            path.replaceWith(newExpression);
            break;
          }
          case 'toThrow': {
            const newExpression = toThrow(path);
            path.replaceWith(newExpression);
            break;
          }
          default:
            console.log(
              '\x1b[31m',
              `Unhandled jest helper: ${path.node.callee.property.name}`
            );
            break;
        }
      }
    },
  });

  return generate.default(ast, { retainLines: true }).code;
};
