import * as t from '@babel/types';

export const toBeDefined = (path: any) => {
  const actual = path.node.callee.object.arguments[0];

  // Create a new assert.notStrictEqual() call expression with `undefined` as the second argument
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('notStrictEqual')),
    [actual, t.identifier('undefined')]
  );
};
