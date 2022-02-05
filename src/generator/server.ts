import escodegen from 'escodegen'
import * as SyntaxBase from './syntax/syntax'
// import * as SyntaxDeclarations from './syntax/declarations'
import * as SyntaxExpressions from './syntax/expressions'
import * as SyntaxStatements from './syntax/statements'

export function generateServerProgram(): string {
    const programSyntax = {
        type: 'Program',
        body: [
            ...baseConstants(),
            ...setDefaultMiddlewares(),
            ...setListening()
        ]
    }

    return escodegen.generate(programSyntax)
}

const jsonServerIdentifier: SyntaxBase.Identifier = {
    type: 'Identifier',
    name: 'jsonServer'
}

const serverIdentifier: SyntaxBase.Identifier = {
    type: 'Identifier',
    name: 'server'
}

const middlewaresIdentifier: SyntaxBase.Identifier = {
    type: 'Identifier',
    name: 'middlewares'
}

function consoleLogStatement(args: SyntaxExpressions.Expression[]): SyntaxStatements.ExpressionStatement {
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

function baseConstants(): SyntaxStatements.Statement[] {
    return [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: jsonServerIdentifier,
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'require'
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 'json-server'
                            }
                        ]
                    }
                },
            ],
            kind: 'const'
        },
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: serverIdentifier,
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: jsonServerIdentifier,
                            property: {
                                type: 'Identifier',
                                name: 'create'
                            }
                        },
                        arguments: []
                    }
                },
            ],
            kind: 'const'
        },
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: middlewaresIdentifier,
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: jsonServerIdentifier,
                            property: {
                                type: 'Identifier',
                                name: 'defaults'
                            }
                        },
                        arguments: []
                    }
                },
            ],
            kind: 'const'
        }
    ]
}

function setDefaultMiddlewares(): SyntaxStatements.Statement[] {
    return [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: serverIdentifier,
                    property: {
                        type: 'Identifier',
                        name: 'use'
                    }
                },
                arguments: [middlewaresIdentifier]
            }
        },
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: serverIdentifier,
                    property: {
                        type: 'Identifier',
                        name: 'use'
                    }
                },
                arguments: [
                    {
                        type: 'MemberExpression',
                        computed: false,
                        object: jsonServerIdentifier,
                        property: {
                            type: 'Identifier',
                            name: 'bodyParser'
                        }
                    }
                ]
            }
        }
    ]
}

function setListening(): SyntaxStatements.Statement[] {
    return [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'MemberExpression',
                    computed: false,
                    object: serverIdentifier,
                    property: {
                        type: 'Identifier',
                        name: 'listen'
                    }
                },
                arguments: [
                    {
                        type: 'Literal',
                        value: 3000
                    },
                    {
                        type: 'ArrowFunctionExpression',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                consoleLogStatement([
                                    {
                                        type: 'Literal',
                                        value: 'JSON Server is running'
                                    }
                                ])
                            ]
                        }
                    }
                ]
            }
        }
    ]
}
