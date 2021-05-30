const superagent = require('superagent');
const jsonpath = require('jsonpath');

function vision(base64, config, callback){
        superagent
        .post('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze')
        .send({
            "folderId": "b1gdk64keun8tu019smg",
            "analyze_specs": [{
            "content": base64,
            "features": [{
                "type": "TEXT_DETECTION",
                "text_detection_config": {
                    "language_codes": ["*"]
                }
                }]
            }]
        })
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + "t1.9euelZqMipuWnYzKj4mOiouKlsuXju3rnpWalJvIlJ3IzY2dm5vGiZOMiZDl9PcLb296-e9sEBPH3fT3Sx1tevnvbBATxw.FyyWNGZNuqj3c9PcCtaENIFm_7JMV2xLFV46uOj8FcWmR773H7qyg4IL2XlAyzBq-EzCz-m6XNg9KPRoi905CQ")
        .ok(res => {
            return (res.status === 200) && (jsonpath.query(res.body, '$..error').length === 0);
        })
        .then(res => {
            // извлекаем с помощью шаблона jsonpath весь текст
            var output = jsonpath.query(res.body, '$..text')
                // склеиваем элементы массива в строку
                .join(' ');         
            callback(false, output);
            }
        )
        .catch(err => {
            var x = {
                "code"   : jsonpath.query(err.response.body, '$..code').toString(),
                "message": jsonpath.query(err.response.body, '$..message').toString(),
                "status" : err.status
            };   
            callback(true, x);
        });
}


module.exports = vision;
