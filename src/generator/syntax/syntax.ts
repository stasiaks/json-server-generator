import { Expression, Literal } from './expressions'
import { Directive, Statement } from './statements'

export type Program = {
    type: 'Program',
    body: (Directive | Statement)[]
}

export type Identifier = {
    type: 'Identifier',
    name: string
}

export type Property = {
    type: 'Property',
    key: Literal | Identifier,
    value: Expression,
    kind: 'init' | 'get' | 'set'
}
