const superagent = require('superagent');
const jsonpath = require('jsonpath');

function textTransformation(base64, config, callback){
        superagent
        .post('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze')
        .send({
            "folderId": "b1gvpeenel342j5a12pr",
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
        .set('Authorization', 'Bearer ' + config.Bearer)
        .ok(res => {
            return (res.status === 200) && (jsonpath.query(res.body, '$..error').length === 0);
        })
        .then(res => {
            var output = jsonpath.query(res.body, '$..text')
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


module.exports = textTransformation;