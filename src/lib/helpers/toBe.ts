import * as t from '@babel/types';

export const toBe = (path: any) => {
  const actual = path.node.callee.object.arguments[0];
  const expected = path.node.arguments[0];

  // Replace with assert.strictEqual()
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
    [actual, expected]
  );
};
