const recognize = require('./index')
const fs = require('fs')
const base64_js = require('base64-js')
let config = {}

describe('img', function () {
    this.timeout(10000);
    it('Распознование номера автомобиля',  (done)=> {
        let base64_picture = base64_js.fromByteArray(fs.readFileSync("./3.PNG"));
        config.Bearer = 't1.9euelZqPyIrJkIuaxpuPyc-YjpHGk-3rnpWajYrIjJDJxs-czI-Lk52Uj5rl8_cZO2d5-e8BDB86_N3z91lpZHn57wEMHzr8.jwyfKeBQ1O5VLd3x6dGk21hhug4J8ONa6hjYs5kkJ76DoDLZGW_SEXrGyZv1ReOG-tqrezGCIHbBXPb5FNQ9DA';
        config.folderId = 'b1g2gcu5s6d045apra2i';
        recognize(base64_picture, config, function (err, text) {
            try {
                console.log(text)
            } catch (e) {
                done(e);
                return;
            }
            done();
        });
    });
});