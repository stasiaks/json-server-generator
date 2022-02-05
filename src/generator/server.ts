import escodegen from 'escodegen'
import * as Syntax from './syntax'

export function generateServerProgram(): string {
    const programSyntax = {
        type: 'Program',
        body: [
            ...baseConstants()
        ]
    }

    return escodegen.generate(programSyntax)
}

function baseConstants(): Syntax.Statement[] {
    return [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'jsonServer'
                    },
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
                    id: {
                        type: 'Identifier',
                        name: 'server'
                    },
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'jsonServer'
                            },
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
                    id: {
                        type: 'Identifier',
                        name: 'router'
                    },
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'jsonServer'
                            },
                            property: {
                                type: 'Identifier',
                                name: 'router'
                            }
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 'db.json'
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
                    id: {
                        type: 'Identifier',
                        name: 'middlewares'
                    },
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'jsonServer'
                            },
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
