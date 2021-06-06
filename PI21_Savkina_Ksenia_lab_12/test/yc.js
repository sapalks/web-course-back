const recognize = require('../index')
const fs = require('fs')
const base64_js = require('base64-js')
var config = {}

describe('Тест', function () {
    this.timeout(10000);
    it('Распознование текста на изображении', function (done) {
        var base64_picture = base64_js.fromByteArray(fs.readFileSync("test/picture.png"));
        config.Bearer = 't1.9euelZqPjJiPnYqUmMaXnc-TxoqYm-3rnpWayJqbzpaXm5qcyZOLi5Oblp7l8_dEVjJ6-e9LXFB__N3z9wQFMHr570tcUH_8zef1656VmsfNipOKnZOUjMaJkpfMks-S7_0.Q_lJ0jbd3I8tXyl_VvJkCBVqX9ZGNDaQwepnbuY7r6iloWffKZ4Th3f3bUaZLMQATwOt6eLSN8noagjONwLUBA'; 
        config.folderId = 'b1g47ugv91799jpo38l3';
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