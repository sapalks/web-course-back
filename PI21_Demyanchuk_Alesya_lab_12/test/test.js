const recognize = require('../index')
const fs = require('fs')
const base64_js = require('base64-js')
var config = {}

describe('Тест', function () {
    this.timeout(10000);
    it('Распознование текста на изображении', function (done) {
        var base64_picture = base64_js.fromByteArray(fs.readFileSync("test/marius.png"));
        config.Bearer = 't1.9euelZqbkY6ajo6NxozMkcbPi8iLmO3rnpWanZqMmMaKjseXmpaYjo7Ni47l8_dmH3J5-e9xUl16_N3z9yZOb3n573FSXXr8.g9dwL8lp77tljZT9HaZuQZGAnACDtcwXgltREvrjptHGox6SCgtf9_wxTAanKwFSTQCZMgE-TM4eE-JFtagKBg'; 
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