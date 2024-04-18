import * as t from '@babel/types';

export const toHaveLength = (path: any) => {
  const actual = path.node.callee.object.arguments[0]; // the value passed to expect()
  const expectedLength = path.node.arguments[0];

  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
    [t.memberExpression(actual, t.identifier('length'), false), expectedLength]
  );
};
