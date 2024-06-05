import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from "./report.js";

function main() {
    if (argv[2] === undefined) {
        console.log('no argument supplied');
        process.exit(1);
    } else if (argv[3] !== undefined) {
        console.log('more than 1 argument supplied');
        process.exit(1);
    }

    argv.forEach(async arg => {
        if (arg === argv[2]) {
            console.log(`starting crawler at ${arg}`);
            const crawlCount = await crawlPage(arg);
            printReport(crawlCount);
        }
    })
}

main();