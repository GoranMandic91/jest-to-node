import * as t from '@babel/types';

export const toStrictEqual = (path: any) => {
  const actual = path.node.callee.object.arguments[0];
  const expected = path.node.arguments[0];

  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [actual, expected]
  );
};
