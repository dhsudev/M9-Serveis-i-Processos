import chalk from 'chalk';

const logServices = {
    info: (message) => {
        console.log(chalk.blue(`INFO: ${chalk.white(message)}`));
    },
    warn: (message) => {
        console.log(chalk.yellow(`WARN: ${chalk.white(message)}`));
    },
    error: (message) => {
        console.log(chalk.red(`ERROR: ${chalk.white(message)}`));
    },
    success: (message) => {
        console.log(chalk.green(`SUCCESS: ${chalk.white(message)}`));
    }
};

export default logServices;