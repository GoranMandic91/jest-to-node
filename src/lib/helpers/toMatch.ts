import * as t from '@babel/types';

export const toMatch = (path: any) => {
  const regex = path.node.arguments[0];
  const actual = path.node.callee.object.arguments[0]; // the value passed to expect()

  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('match')),
    [actual, regex]
  );
};
