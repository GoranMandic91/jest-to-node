import * as t from '@babel/types';

export const toHaveBeenLastCalledWith = (path: any) => {
  const spy = path.node.callee.object.arguments[0];
  const args = t.arrayExpression(path.node.arguments);
  const lastCallArgs = t.memberExpression(
    t.memberExpression(spy, t.identifier('mock'), false),
    t.identifier('lastCall'),
    false
  );
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [lastCallArgs, args]
  );
};
