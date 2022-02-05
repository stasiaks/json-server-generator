export type Program = {
    type: 'Program',
    body: (Directive | Statement)[]
}

export type Directive = {
    type: 'ExpressionStatement'
    expression: Literal
    directive: string
}

export type Literal = {
    type: 'Literal',
    value: string | boolean | null | number | RegExp
}

export type Statement = Declaration

export type Declaration = VariableDeclaration

export type VariableDeclaration = {
    type: 'VariableDeclaration',
    declarations: VariableDeclarator[],
    kind: 'var' | 'let' | 'const'
}

export type VariableDeclarator = {
    type: 'VariableDeclarator',
    id: Identifier,
    init: Expression | null
}

export type Identifier = {
    type: 'Identifier',
    name: string
}

export type Expression
    = Identifier
    | Literal
    | ThisExpression
    | ArrayExpression
    | ObjectExpression
    | CallExpression
    | MemberExpression

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

export type Property = {
    type: 'Property',
    key: Literal | Identifier,
    value: Expression,
    kind: 'init' | 'get' | 'set'
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
