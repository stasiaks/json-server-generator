import { discardIdentifier, serverIdentifier } from './common-identifiers'
import { consoleLogStatement } from './common-statements'
import { Statement } from './syntax/statements'
import { Identifier } from './syntax/syntax'


const createResponseBodyIdentifier: Identifier = {
    type: 'Identifier',
    name: 'createResponseBody'
}

const requestIdentifier: Identifier = {
    type: 'Identifier',
    name: 'request'
}

const responseIdentifier: Identifier = {
    type: 'Identifier',
    name: 'response'
}

const responseBodyIdentifier: Identifier = {
    type: 'Identifier',
    name: 'responseBody'
}

export function responseMiddleware(): Statement[] {
    return [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    id: createResponseBodyIdentifier,
                    init: {
                        type: 'ArrowFunctionExpression',
                        params: [requestIdentifier],
                        body: {
                            type: 'BlockStatement',
                            body: []
                        }
                    }
                }
            ],
            kind: 'const'
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
                        type: 'ArrowFunctionExpression',
                        params: [requestIdentifier, responseIdentifier, discardIdentifier],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                consoleLogStatement([
                                    {
                                        type: 'Literal',
                                        value: 'Request path: '
                                    },
                                    {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: requestIdentifier,
                                        property: {
                                            type: 'Identifier',
                                            name: 'path'
                                        }
                                    }]),
                                consoleLogStatement([
                                    {
                                        type: 'Literal',
                                        value: 'Request body: '
                                    },
                                    {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: requestIdentifier,
                                        property: {
                                            type: 'Identifier',
                                            name: 'body'
                                        }
                                    }]),
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: responseBodyIdentifier,
                                            init: {
                                                type: 'CallExpression',
                                                callee: createResponseBodyIdentifier,
                                                arguments: [requestIdentifier]
                                            }
                                        }
                                    ],
                                    kind: 'const'
                                },
                                consoleLogStatement([
                                    {
                                        type: 'Literal',
                                        value: 'Response body: '
                                    },
                                    responseBodyIdentifier])
                            ]
                        }
                    }
                ]
            }
        }]
}
