import chalk from 'chalk';

const debug = require('debug')('app:startMessage');

// Display console message so we know our app is starting
debug(chalk.green('Starting app in dev mode...'));
