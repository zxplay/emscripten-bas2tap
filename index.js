const Module = require('./dist/bas2tap.js')

module.exports = input => {

    // Prepare args for the bas2tap command.
    const args = [];
    args.push('input.bas');
    args.push('output.tap');
    args.push('-a');

    // Collect output.
    const out = [];

    // Call the bas2tap module with data for command.
    return new Promise((resolve, reject) => {
        Module({
            arguments: args,
            input,
            out,
            resolve,
            reject,
            print: (text) => {
                // console.log(`[stdout] ${text}`);
                out.push({type: 'out', text});
            },
            printErr: (text) => {
                // console.log(`[stderr] ${text}`);
                out.push({type: 'err', text});
            }
        });
    });
}
