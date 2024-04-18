import * as t from '@babel/types';

export const toBeUndefined = (path: any) => {
  const actual = path.node.callee.object.arguments[0]; // the argument passed to expect()

  // Create a new assert.strictEqual() call expression with `undefined` as the second argument
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
    [actual, t.identifier('undefined')]
  );
};
