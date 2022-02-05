import { program } from 'commander';

program
    .name('json-server-generator')
    .description('Simple tool for json-server base project generation')
    .version('0.0.1')

program
    .option('-v, --verbose', 'explain what is being done')

program
    .command('generate')
    .description('generate json-server project')
    .action(() => {});


program.parse();
