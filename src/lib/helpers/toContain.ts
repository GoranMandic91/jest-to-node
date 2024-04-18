import * as t from '@babel/types';

export const toContain = (path: any) => {
  const arrayOrString = path.node.callee.object.arguments[0];
  const item = path.node.arguments[0];

  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('ok')),
    [
      t.callExpression(
        t.memberExpression(arrayOrString, t.identifier('includes'), false),
        [item]
      ),
    ]
  );
};
