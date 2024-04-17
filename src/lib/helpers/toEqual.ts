import * as t from '@babel/types';

export const toEqual = (path: any) => {
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
    [
      path.node.callee.object.arguments[0], // the first argument to `expect()`
      path.node.arguments[0], // the argument to `toEqual()`
    ]
  );
};
