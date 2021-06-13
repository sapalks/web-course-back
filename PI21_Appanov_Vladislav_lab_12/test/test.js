const recognize = require('../index')
const fs = require('fs')
const base64_js = require('base64-js')
var config = {}

describe('Тест', function () {
    this.timeout(10000);
    it('Распознование текста на изображении', function (done) {
        var base64_picture = base64_js.fromByteArray(fs.readFileSync("test/test.jpg"));
        config.Bearer = 't1.9euelZqajpuel5rPyImenoqUxsmLnu3rnpWayMuNjM6VjIqQmMuNnMyNnI_l9PcQOwx6-e8-PUu03fT3UGkJevnvPj1LtA.Lb-XKgQtFTI7yFTO4GY46UpNdqtxWwJMr9RMn-6UfVsESNntBilbofpuQq8wz0DqkY-1Gmc4E45Dv-neGM1cBA'; 
        config.folderId = 'b1gbhdv2v1g4pi9s8f9h';
        recognize(base64_picture, config, function (err, text) {
            if (err) {
                return;
            }
            var array = text.split(' ');
            var State, Name, SurName, Patronymic
            
            State = array[array.indexOf('Участок') + 1];
            Name = array[array.indexOf('ИМЯ') + 1];
            SurName = array[array.indexOf('ФАМИЛИЯ') + 1];
            Patronymic = array[array.indexOf('ОТЧЕСТВО') + 1];

            console.log(`Пациент ${SurName} ${Name} ${Patronymic} прикреплен к участку ${State}`);
            done();
        });
    });
});