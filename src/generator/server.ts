import escodegen from 'escodegen'
import { fsIdentifier, jsonServerIdentifier, requireIdentifier, serverIdentifier } from './common-identifiers'
import { consoleLogStatement } from './common-statements'
import { responseMiddleware } from './response-middleware'
import { Statement } from './syntax/statements'
import { Identifier } from './syntax/syntax'

export function generateServerProgram(port: number, hostname: string): string {
    const programSyntax = {
        type: 'Program',
        body: [
            ...baseConstants(),
            ...setDefaultMiddlewares(),
            ...responseMiddleware(),
            ...setListening(port, hostname)
        ]
    }

    return escodegen.generate(programSyntax)
}

const middlewaresIdentifier: Identifier = {
    type: 'Identifier',
    name: 'middlewares'
}

function baseConstants(): Statement[] {
    return [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: fsIdentifier,
                    init: {
                        type: 'CallExpression',
                        callee: requireIdentifier,
                        arguments: [
                            {
                                type: 'Literal',
                                value: 'fs'
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
                    id: jsonServerIdentifier,
                    init: {
                        type: 'CallExpression',
                        callee: requireIdentifier,
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

function setDefaultMiddlewares(): Statement[] {
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

function setListening(port: number, hostname: string): Statement[] {
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
                        value: port
                    },
                    {
                        type: 'Literal',
                        value: hostname
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
