const superagent = require('superagent')
const jsonpath = require('jsonpath')

function textRecognising(base64, config, callback) {
    superagent
    .post('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze')
    .send({
        "folderId": config.Folder_id,
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
    .then(res => {
        var text = jsonpath.query(res.body, '$..text').join(' ');         
        callback(false, text);
    })
    .catch(callback(true, ''));
}

module.exports = { textRecognising }