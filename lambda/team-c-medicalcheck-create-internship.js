// {
//     "userId": "hashi",
//     "sex": 1,
//     "weight": 60,
//     "height": 180,
//     "fat": 17,
//     "smoke": 0,
//     "alcohol": 1,
//     "maxPressure": 120,
//     "minPressure": 80,
//     "urinalysis": 0,
//     "xray": 0,
//     "cardiogram": 0,
//     "liver": 0,
//     "lipid": 0,
//     "bloodSugar": 0
// }

// 0:男、1:女
// 0:無、1:有
// 0:正常、1:異常


var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "team-c-MedicalCheck";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    var body = JSON.parse(event.body);

    //bodyが空だったら返す
    if (!body) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "bodyが空です"});
        callback(null,response);
        return;
    }

    //bodyの中身を取得
    var userId = body.userId;
    var sex = body.sex;
    var weight = body.weight;
    var height = body.height;
    var fat = body.fat;
    var smoke = body.smoke;
    var alcohol = body.alcohol;
    var maxPressure = body.maxPressure;
    var minPressure = body.minPressure;
    var urinalysis = body.urinalysis;
    var xray = body.xray;
    var cardiogram = body.cardiogram;
    var liver = body.liver;
    var lipid = body.lipid;
    var bloodSugar = body.bloodSugar;


    //userテーブルのvalidation(paramのどれかが空だったら返す)
    if (!userId == null) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "userIdは必須です"});
        callback(null,response);
        return;
    }

    //正規表現チェック
    var charptn = /^[A-Za-z]\w*[A-Za-z0-9]$/g;
    var cuserId = userId.match(charptn);
    if (!cuserId) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "userIdの入力が正しくありません"});
        callback(null,response);
        return;
    }

    //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    var param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "sex": sex,
            "weight": weight,
            "height": height,
            "fat": fat,
            "smoke": smoke,
            "alcohol": alcohol,
            "maxPressure": maxPressure,
            "minPressure": minPressure,
            "urinalysis": urinalysis,
            "xray": xray,
            "cardiogram": cardiogram,
            "liver": liver,
            "lipid": lipid,
            "bloodSugar": bloodSugar
        }
    };

    //dynamo.put()でDBにデータを登録
    dynamo.put(param, function(err, data) {
        if (err) {
            //TODO: 登録に失敗した場合の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "データの登録に失敗しました"
            });
            callback(null, response);
            return;
        } else {
            //TODO: 登録に成功した場合の処理を記述
            response.body = JSON.stringify(param.Item);
            callback(null, response);
            return;
        }
    });
};
