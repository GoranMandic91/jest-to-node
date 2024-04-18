import * as t from '@babel/types';

export const toMatchObject = (path: any) => {
  const expected = path.node.arguments[0]; // the object passed to toMatchObject
  const actual = path.node.callee.object.arguments[0]; // the argument passed to expect()

  // Create a new assert.deepStrictEqual() call expression
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [actual, expected]
  );
};
