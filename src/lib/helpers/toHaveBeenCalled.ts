import * as t from '@babel/types';

export const toHaveBeenCalled = (path: any) => {
  const spy = path.node.callee.object.arguments[0]; // the spy or stub passed to expect()

  // Create a new assert.ok() call expression to check if the call count is greater than 0
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('ok')),
    [
      t.binaryExpression(
        '>',
        t.memberExpression(spy, t.identifier('callCount'), false),
        t.numericLiteral(0)
      ),
    ]
  );
};
