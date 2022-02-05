import chalk from 'chalk'

export const verboseMessage: (msg: string) => string =
    (msg) => chalk.bgGrey.white('json-server-generator') + ' ' + chalk.bgGrey.cyan('verb') + ' ' + chalk.white(msg)
