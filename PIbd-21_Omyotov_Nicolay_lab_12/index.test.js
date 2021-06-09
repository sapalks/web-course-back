const detect = require("./index");
const fs = require("fs");
const base64_js = require("base64-js");
var config = {
  Bearer:
    "t1.9euelZqTmpWVl5WdlsjPis7MyZGPke3rnpWanomei4ubz5uKyMjHz8zHipPl8_c1ZXt5-e8kf3st_d3z93UTeXn57yR_ey39.IeRj9wjexvCSaxilJcd6C1195gjCNWUJjf2UREKKdqP6rDU_WoDZJZxlSqxkXlqQdBc-ytptf3CF5ToW3_mABg",
  folderId: "b1gt45v79muidfaamjna",
};

describe("Тестирование распознования текста", function () {
  this.timeout(5000);
  it("Детектор текста объявлений", function (done) {
    var base64_img = base64_js.fromByteArray(fs.readFileSync("test_img/3.png"));
    detect(base64_img, config, function (err, result) {
      try {
        console.log(result);
      } catch (e) {
        done(e);
        return;
      }
      done();
    });
  });
});
