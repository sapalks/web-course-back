var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var textTransformation = require('../index');
var fs = require("fs");
var base64_convert = require('base64-js');


describe('Тест', function () {
    this.timeout(7777);
    it('Распознование изображений', function (done) {
        var image_base64 = base64_convert.fromByteArray(fs.readFileSync("test/ya.png"));
        var config = {
            "Bearer": "t1.9euelZqQlJePj5SMlZiSzIvOlJiVmu3rnpWanpGLkpGKm4uPlZ6XxpqQkovl8_d8VxB6-e8kOk4a_d3z9zwGDnr57yQ6Thr9.z_678H1EbDtYy5f7vslwIItX7TjMzVwjyw_MguOaR2-GNB9R9x0bgqwGbyXLoH5r5uEx2xgPeFgTpl7luMnwDA"
        };
        textTransformation(image_base64, config, function (err, text) {
            if (err) {
                return;
            }
            var array = text.split(' ');
            var firmName, firmAddress
            
            if (array.indexOf('Название:') != -1) {
                firmName = array[array.indexOf('Название:') + 1];
            }
            else if (array.indexOf('Фирма:') != -1) {
                firmName = array[array.indexOf('Фирма:') + 1];
            }
            else {
                firmName = 'ФИРМЫ НЕ СУЩЕСТВУЕТ!';
            }

            if (array.indexOf('Адрес:') != -1) {
                firmAddress = array[array.indexOf('Адрес:') + 1];
            }
            else {
                firmAddress = 'АДРЕС НЕ УКАЗАН!';
            }

            console.log(`Фирма ${firmName} расположена по адресу улица ${firmAddress}`);
            done();
        });
    });
});

function parsingText(text) {

}
