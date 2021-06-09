const superagent = require("superagent");
const jsonpath = require("jsonpath");

function detect(base64, config, callback) {
  superagent
    .post("https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze")
    .send({
      folderId: config.folderId,
      analyze_specs: [
        {
          content: base64,
          features: [
            {
              type: "TEXT_DETECTION",
              text_detection_config: {
                language_codes: ["*"],
              },
            },
          ],
        },
      ],
    })
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + config.Bearer)
    .then((res) => {
      const text = jsonpath.query(res.body, "$..text").join("\n");
      callback(false, text);
    })
    .catch((err) => {
      const text = {
        code: jsonpath.query(err.response.body, "$..code").join(" "),
        message: jsonpath.query(err.response.body, "$..message").join(" "),
        status: err.status,
      };
      callback(true, text);
    });
}

module.exports = detect;
