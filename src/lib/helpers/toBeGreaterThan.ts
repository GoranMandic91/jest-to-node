import * as t from '@babel/types';

export const toBeGreaterThan = (path: any) => {
  const actual = path.node.callee.object.arguments[0]; // the actual value being tested
  const expected = path.node.arguments[0]; // the value it should be greater than

  // Create a new assert.ok() call expression with a greater than condition
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('ok')),
    [t.binaryExpression('>', actual, expected)]
  );
};
