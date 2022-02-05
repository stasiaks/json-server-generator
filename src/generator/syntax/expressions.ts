import { BlockStatement } from './statements'
import { Identifier, Property } from './syntax'


export type Expression =
    | Identifier
    | Literal
    | ThisExpression
    | ArrayExpression
    | ObjectExpression
    | CallExpression
    | MemberExpression
    | ArrowFunctionExpression

export type Literal = {
    type: 'Literal',
    value: string | boolean | null | number | RegExp
}

export type ThisExpression = {
    type: 'ThisExpression'
}

export type ArrayExpression = {
    type: 'ArrayExpression',
    elements: (Expression | null)[]
}

export type ObjectExpression = {
    type: 'ObjectExpression',
    properties: Property[]
}

export type CallExpression = {
    type: 'CallExpression',
    callee: Expression,
    arguments: Expression[]
}

export type MemberExpression = {
    type: 'MemberExpression',
    object: Expression,
    property: Expression,
    computed: boolean
}

export type ArrowFunctionExpression = {
    type: 'ArrowFunctionExpression',
    params: Identifier[],
    body: Expression | BlockStatement
}
