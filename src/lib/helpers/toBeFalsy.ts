import * as t from '@babel/types';

export const toBeFalsy = (path: any) => {
  const actual = path.node.callee.object.arguments[0];

  //The .toBeFalsy() assertion in Jest checks if a value is falsy (false, 0, "", null, undefined, or NaN). In Node, you can use assert.ok(!value) to achieve the same check
  return t.callExpression(
    t.memberExpression(t.identifier('assert'), t.identifier('ok')),
    [t.unaryExpression('!', actual, true)]
  );
};
