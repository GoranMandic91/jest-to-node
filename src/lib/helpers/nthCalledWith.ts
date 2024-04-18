import * as t from '@babel/types';

export const nthCalledWith = (path: any) => {
  const nth = path.node.arguments[0];
  const spy = path.node.callee.object.arguments[0];
  const args = t.arrayExpression(path.node.arguments.slice(1));
  const nthCallArgs = t.memberExpression(
    t.memberExpression(spy, t.identifier('mock'), false),
    t.identifier('calls'),
    true
  );
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [t.memberExpression(nthCallArgs, nth, true), args]
  );
};
