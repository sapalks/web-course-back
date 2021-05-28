var { textRecognising } = require('../index')
var fs = require('fs')
var base64_convert = require('base64-js')
const IAM_TOKEN = 't1.9euelZqWjZWdmpWayZDMnpjPl5Ocmu3rnpWayo2byM-SjsuWjJWJncfKmovl9PdyGWB6-e9MAHOY3fT3MkhdevnvTABzmA.yfNiMw2__0vMeAXt3fY-trL-Wjp9vmyRmFPE4fi3JaDU-jPjzvwpiP6BI8BRYCoyCQeq37lwysThXRe5vi4ICQ'
const FOLDER_ID = 'b1g6fkqvd1rfbbmppmgv'
const timeout = 10000
var config = { }

function setConfig() {
    config.Bearer = IAM_TOKEN;
    config.Folder_id = FOLDER_ID;
}

describe('Тест', function () {
    this.timeout(timeout);
    it('Распознование изображений', function (done) {
        var image = fs.readFileSync("test/studentTicket.jpg");
        var image_base64 = base64_convert.fromByteArray(image);
        setConfig();
        textRecognising(image_base64, config, function (err, text) {
            if (err) return;
            parsingText(text);
            done();
        });
    });
});

function parsingText(text) {
    var array = text.split(' ')
    var surname, name, patronymic
    surname = array.indexOf('Фамилия') != -1 ? array[array.indexOf('Фамилия') + 1] : 'NULL';
    name = array.indexOf('Имя') != -1 ? array[array.indexOf('Имя') + 1] : 'NULL';
    patronymic = array.indexOf('Отчество') != -1 ? array[array.indexOf('Отчество') + 1] : 'NULL';
    console.log(`Student fullname: ${surname} ${name} ${patronymic}`)
}