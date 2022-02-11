import { Command, InvalidArgumentError, program } from 'commander'
import { Options as GenerateOptions, generateAction } from './commands/generate'

export type GlobalOptions = {
    verbose?: boolean;
}

function parseIntOption(value: string, _: number) {
  const parsedValue = parseInt(value, 10)
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
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
    .option('-p, --port <int>', 'port on which your server will be listening', parseIntOption, 3000)
    .option('-n, --hostname <string>', 'hostname on which your server will be listening', '127.0.0.1')
    .action((_, command: Command) => {
        const options = command.optsWithGlobals() as GenerateOptions
        generateAction(options)
    })

program.parse()
