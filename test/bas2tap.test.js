// noinspection JSUnresolvedFunction

import * as assert from "assert";
import bas2tap from "../index.js";

function printErrorOut(errorItems) {
    for (let i = 0; i < errorItems.length; i++) {
        const item = errorItems[i];
        if (item.type === 'out') {
            console.log(`[stdout] ${item.text}`);
        } else {
            console.assert(item.type === 'err');
            console.log(`[stderr] ${item.text}`);
        }
    }
}

describe('bas2tap', () => {
    test('hello, world', () => {
        let bas = '';
        bas = bas + '10 PRINT "Hello, world!"\n';
        bas = bas + '20 GO TO 10';

        return bas2tap(bas).then(
            result => {
                expect(JSON.stringify(result)).toBe(
                    "{\"0\":19,\"1\":0,\"2\":0,\"3\":0,\"4\":32,\"5\":32,\"6\":32,\"7\":32,\"8\":32," +
                    "\"9\":32,\"10\":32,\"11\":32,\"12\":32,\"13\":32,\"14\":35,\"15\":0,\"16\":0,\"17\":0,\"18\":35," +
                    "\"19\":0,\"20\":0,\"21\":37,\"22\":0,\"23\":255,\"24\":0,\"25\":10,\"26\":17,\"27\":0," +
                    "\"28\":245,\"29\":34,\"30\":72,\"31\":101,\"32\":108,\"33\":108,\"34\":111,\"35\":44,\"36\":32," +
                    "\"37\":119,\"38\":111,\"39\":114,\"40\":108,\"41\":100,\"42\":33,\"43\":34,\"44\":13,\"45\":0," +
                    "\"46\":20,\"47\":10,\"48\":0,\"49\":236,\"50\":49,\"51\":48,\"52\":14,\"53\":0,\"54\":0," +
                    "\"55\":10,\"56\":0,\"57\":0,\"58\":13,\"59\":235}"
                );
            },
            error => {
                printErrorOut(error);
                assert.fail();
            }
        );
    });

    test('error in program', () => {
        let bas = '';
        bas = bas + 'PRINT"\n';

        try {
            return bas2tap(bas).then(
                result => {
                    expect(JSON.stringify(result)).toBe("{}");
                    assert.fail(); // Expecting error here.
                },
                error => {
                    expect(error.length).toBe(6);
                    expect(error[error.length - 2].type).toBe('err');
                    expect(error[error.length - 2].text).toBe('ERROR - ASCII line 1 misses terminating quote');
                }
            );
        } catch (e) {
            console.error(e);
        }
    });
})
