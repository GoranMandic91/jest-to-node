import * as t from '@babel/types';

export const toBeInstanceOf = (path: any) => {
  const expectedClass = path.node.arguments[0];
  const actual = path.node.callee.object.arguments[0]; // the value passed to expect()

  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('ok')),
    [t.binaryExpression('instanceof', actual, expectedClass)]
  );
};
