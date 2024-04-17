import * as t from '@babel/types';

export const toHaveBeenCalledWith = (path: any) => {
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [
      t.memberExpression(
        t.memberExpression(
          path.node.callee.object.arguments[0],
          t.identifier('getCall'),
          false
        ),
        t.identifier('args'),
        true
      ),
      t.arrayExpression(path.node.arguments), // pass the arguments array directly
    ]
  );
};
