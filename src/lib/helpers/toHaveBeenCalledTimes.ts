import * as t from '@babel/types';

export const toHaveBeenCalledTimes = (path: any) => {
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
    [
      t.memberExpression(
        t.memberExpression(
          path.node.callee.object.arguments[0],
          t.identifier('mock'),
          false
        ),
        t.identifier('calls'),
        false
      ),
      path.node.arguments[0],
    ]
  );
};
