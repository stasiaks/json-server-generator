import { Command, program } from 'commander'
import { Options as GenerateOptions, generateAction } from './commands/generate'

export type GlobalOptions = {
    verbose?: boolean;
}

program
    .name('json-server-generator')
    .description('Simple tool for json-server base project generation')
    .version('0.0.1')

program
    .option('-v, --verbose', 'explain what is being done')

program
    .command('generate')
    .description('generate json-server project')
    .action((_, command: Command) => {
        const options = command.optsWithGlobals() as GenerateOptions
        generateAction(options)
    })

program.parse()
