const recognize = require('../index')
const fs = require('fs')
const base64_js = require('base64-js')
var config = {}

describe('Тест', function () {
    this.timeout(10000);
    it('Распознование текста на изображении', function (done) {
        var base64_picture = base64_js.fromByteArray(fs.readFileSync("test/corona.png"));
        config.Bearer = 't1.9euelZqdi8iemonJzoqPi4udy5PLzO3rnpWanZqMmMaKjseXmpaYjo7Ni47l8_c6JHh5-e9TN08d_t3z93pSdXn571M3Tx3-.b0ULSlm9hGINcyNAz42MNB-mEUw6Tcrvexj6-IuTyY33hhk_6rLl9eeO2QuFNeXECSS2oHh43H1BZ0FlXQdGBA'; 
        config.folderId = 'e2l134feubp6uj7hrvpp';
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