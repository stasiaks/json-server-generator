import { Declaration } from './declarations'
import { Expression, Literal } from './expressions'

export type Statement = Declaration | ExpressionStatement | BlockStatement

export type Directive = {
    type: 'ExpressionStatement'
    expression: Literal
    directive: string
}

export type ExpressionStatement = {
    type: 'ExpressionStatement'
    expression: Expression
}

export type BlockStatement = {
    type: 'BlockStatement'
    body: Statement[]
}
