import * as t from '@babel/types';

export const toHaveProperty = (path: any) => {
  const object = path.node.callee.object.arguments[0];
  const property = path.node.arguments[0];
  const value = path.node.arguments[1];
  const hasProperty = t.binaryExpression(
    '!==',
    t.unaryExpression('typeof', t.memberExpression(object, property, true)),
    t.stringLiteral('undefined')
  );

  return value
    ? t.callExpression(
        t.memberExpression(t.identifier('assert'), t.identifier('strictEqual')),
        [t.memberExpression(object, property, true), value]
      )
    : t.callExpression(
        t.memberExpression(t.identifier('assert'), t.identifier('ok')),
        [hasProperty]
      );
};
