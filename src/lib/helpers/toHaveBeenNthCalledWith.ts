import * as t from '@babel/types';

export const toHaveBeenNthCalledWith = (path: any) => {
  const mockFunction = path.node.callee.object.arguments[0]; // the mock function
  const nthCall = path.node.arguments[0]; // the nth call, e.g., 1st, 2nd
  const args = path.node.arguments.slice(1); // the arguments passed in the nth call

  // Create a new assert.deepStrictEqual() call expression to compare the nth call arguments
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('deepStrictEqual')),
    [
      t.memberExpression(
        t.memberExpression(mockFunction, t.identifier('getCall'), false),
        t.identifier('args'),
        true
      ),
      t.arrayExpression(args),
    ]
  );
};
