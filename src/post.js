// noinspection JSUnresolvedVariable

Module['postRun'] = [];

/**
 * Ensures that a required file is always created.
 * This is done by open and closing a file in append mode.
 * @param filename
 */
function ensureFileExists(filename) {
    const file = FS.open(filename, 'a');
    FS.close(file);
}

Module['postRun'].push(function () {
    const tapFilename = 'output.tap';
    ensureFileExists(tapFilename);
    const tap = FS.readFile(tapFilename);

    const errorItems = Module['out'];
    console.assert(Array.isArray(errorItems), errorItems);
    let containsErrors = false;
    for (let i = 0; i < errorItems.length; i++) {
        const item = errorItems[i];
        if (item.type === 'err') {
            containsErrors = true;
            break;
        }
    }

    // Command is successful if there is no stderr out, failed otherwise.
    if (!containsErrors) {
        Module['resolve'](tap);
    } else {
        Module['reject'](errorItems);
    }
});
