#!/usr/bin/env node

import yargs from 'yargs';
import {TreeNode} from './tree.js';
import {getEC2Instances, getAWSPrices} from './aws.js';


const argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 <command> -p')
    .command('show-price',
        'Displays a price of a resources based on a path pattern')
    .example('$0 show-price -p "*.*"')
    .alias('p', 'path')
    .demandOption(['p'])
    .help('h')
    .alias('h', 'help')
    .argv;

/**
 * Main entry point for a util. Takes a path and prints
 * requested information to a console.
 *
 * @param {Object} argv entered parameters
 */
async function main(argv) {
  const tree = new TreeNode();
  const instances = await getEC2Instances();
  const prices = getAWSPrices();
  for (const [key, value] of Object.entries(instances)) {
    tree.addNodesByPath(key).value = prices[value];
  }
  TreeNode.summarizePrice(tree);
  TreeNode.processPath(tree, argv.path);
}


main(argv);
