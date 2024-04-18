import * as t from '@babel/types';

export const toThrow = (path: any) => {
  const actual = path.node.callee.object.arguments[0]; // this should be a function

  //The .toThrow() assertion in Jest checks that a function throws an error when executed. The Node equivalent is assert.throws(function).
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('throws')),
    [actual]
  );
};
