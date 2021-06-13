const recognize = require('../index')
const fs = require('fs')
const base64_js = require('base64-js')
var config = {}

describe('Тест', function () {
    this.timeout(10000);
    it('Распознование текста на изображении', function (done) {
        var base64_picture = base64_js.fromByteArray(fs.readFileSync("test/3.png"));
        config.Bearer = 't1.9euelZqZzMnNxp6LzJOKjsqUlMjLnO3rnpWanZqMmMaKjseXmpaYjo7Ni47l8_dQCW15-e8LXSUE_t3z9xA4ann57wtdJQT-.wCX43z_3YXuu5OQpxd4T9NgxOEmARSLMX3lv7XcFLItTTQGD7_KsCAvE_JbKLmCYrWeL12gngSEuLWy388iQAg'; 
        config.folderId = 'b1gmk9bm5a5t5s437og6';
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