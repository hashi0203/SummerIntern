var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "team-c-daily";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ "message": "" })
    };

    var body = JSON.parse(event.body);

    // bodyが空だったら返す
    if (!body) {
        response.statusCode = 400;
        response.body = JSON.stringify({ "message": "bodyが空です" });
        callback(null, response);
        return;
    }

    //bodyの中身を取得
    var userId = body.userId;
    var timestamp = body.timestamp;
    var breakfast1 = body.breakfast1;
    var lunch1 = body.lunch1;
    var dinner1 = body.dinner1;
    var snack1 = body.snack1;
    var breakfast2 = body.breakfast2;
    var lunch2 = body.lunch2;
    var dinner2 = body.dinner2;
    var snack2 = body.snack2;
    var breakfast3 = body.breakfast3;
    var lunch3 = body.lunch3;
    var dinner3 = body.dinner3;
    var snack3 = body.snack3;
    var breakfast4 = body.breakfast4;
    var lunch4 = body.lunch4;
    var dinner4 = body.dinner4;
    var snack4 = body.snack4;
    var breakfast5 = body.breakfast5;
    var lunch5 = body.lunch5;
    var dinner5 = body.dinner5;
    var snack5 = body.snack5;
    var stepCount = body.stepCount;
    var distCount = body.distCount;
    var bodyWeight = body.bodyWeight;
    var bodyFat = body.bodyFat;
    var maxBldPrs = body.maxBldPrs;
    var minBldPrs = body.minBldPrs;

    //userテーブルのvalidation(paramのどれかが空だったら返す)
    if (!userId || !timestamp) {
        response.statusCode = 400;
        response.body = JSON.stringify({ "message": "パラメータが足りません" });
        callback(null, response);
        return;
    }

    //正規表現チェック
    var charptn = /^[A-Za-z]\w*[A-Za-z0-9]$/g;
    var cuserId = userId.match(charptn);
    if (!cuserId) {
        response.statusCode = 400;
        response.body = JSON.stringify({ "message": "userIdの入力が正しくありません" });
        callback(null, response);
        return;
    }

    timestamp = Number(timestamp);
    if(breakfast1) breakfast1 = Number(breakfast1);
    if(lunch1) lunch1 = Number(lunch1);
    if(dinner1) dinner1 = Number(dinner1);
    if(snack1) snack1 = Number(snack1);
    if(breakfast2) breakfast2 = Number(breakfast2);
    if(lunch2) lunch2 = Number(lunch2);
    if(dinner2) dinner2 = Number(dinner2);
    if(snack2) snack2 = Number(snack2);
    if(breakfast3) breakfast3 = Number(breakfast3);
    if(lunch3) lunch3 = Number(lunch3);
    if(dinner3) dinner3 = Number(dinner3);
    if(snack3) snack3 = Number(snack3);
    if(breakfast4) breakfast4 = Number(breakfast4);
    if(lunch4) lunch4 = Number(lunch4);
    if(dinner4) dinner4 = Number(dinner4);
    if(snack4) snack4 = Number(snack4);
    if(breakfast5) breakfast5 = Number(breakfast5);
    if(lunch5) lunch5 = Number(lunch5);
    if(dinner5) dinner5 = Number(dinner5);
    if(snack5) snack5 = Number(snack5);
    if(stepCount) stepCount = Number(stepCount);
    if(distCount) distCount = Number(distCount);
    if(bodyWeight) bodyWeight = Number(bodyWeight);
    if(bodyFat) bodyFat = Number(bodyFat);
    if(maxBldPrs) maxBldPrs = Number(maxBldPrs);
    if(minBldPrs) minBldPrs = Number(minBldPrs);

    //TODO: paramに更新対象のテーブル名と更新内容を記述
    var param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "timestamp": timestamp,
            "breakfast1": breakfast1,
            "lunch1": lunch1,
            "dinner1": dinner1,
            "snack1": snack1,
            "breakfast2": breakfast2,
            "lunch2": lunch2,
            "dinner2": dinner2,
            "snack2": snack2,
            "breakfast3": breakfast3,
            "lunch3": lunch3,
            "dinner3": dinner3,
            "snack3": snack3,
            "breakfast4": breakfast4,
            "lunch4": lunch4,
            "dinner4": dinner4,
            "snack4": snack4,
            "breakfast5": breakfast5,
            "lunch5": lunch5,
            "dinner5": dinner5,
            "snack5": snack5,
            "stepCount": stepCount,
            "distCount": distCount,
            "bodyWeight": bodyWeight,
            "bodyFat": bodyFat,
            "maxBldPrs": maxBldPrs,
            "minBldPrs": minBldPrs
        }
    };

    //dynamo.put()を用いてデータの更新
    dynamo.put(param, function (err, data) {
        if (err) {
            //TODO: 更新に失敗した場合の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "予期せぬエラーが発生しました"
            });
            callback(null, response);
            return;
        } else {
            //TODO: 更新に成功した場合の処理を記述
            response.body = JSON.stringify(param.Item);
            callback(null, response);
            return;
        }
    });
};
