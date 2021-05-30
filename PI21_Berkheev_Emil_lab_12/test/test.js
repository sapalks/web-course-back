var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var vision = require('../index');
var fs = require("fs");
var base64_convert = require('base64-js');
const api_key = require('./api_key');


describe('Тест', function () {
    this.timeout(15000);
    it("Распознование текста", function (done) {
        var content = fs.readFileSync("test/test3.png");
        var content_base64 = base64_convert.fromByteArray(content);
        var config = {
            "Bearer": api_key
        };
        vision(content_base64, config, function (err, text) {
            try {
                console.log(text)
                expect(text).to.deep.equals("Привет");
            } catch (e) {
                done(e);
                return;
            }
            done();
        });

    });
});