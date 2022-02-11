import { Expression } from './syntax/expressions'
import { ExpressionStatement } from './syntax/statements'

export function consoleLogStatement(args: Expression[]): ExpressionStatement {
    return {
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'MemberExpression',
                computed: false,
                object: {
                    type: 'Identifier',
                    name: 'console'
                },
                property: {
                    type: 'Identifier',
                    name: 'log'
                }
            },
            arguments: args
        }
    }
}
