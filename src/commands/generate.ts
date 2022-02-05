import chalk from 'chalk'
import { GlobalOptions } from '..'
import { generateServerProgram } from '../generator/server'
import { verboseMessage } from '../utils'

export type Options = GlobalOptions

export function generateAction(options: Options) {
    const logVerbose = (msg: string) => { if (options.verbose) console.log(verboseMessage(msg)) }
    logVerbose('Executing ' + chalk.underline.redBright('generate') + ' action')

    const code = generateServerProgram()
    console.log(code)
}
