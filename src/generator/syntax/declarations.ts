import { Expression } from './expressions'
import { Identifier } from './syntax'

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
