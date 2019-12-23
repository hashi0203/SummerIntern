var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "team-c-daily";

exports.handler = (event, context, callback) => {
    //レスポンスの雛形
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ "message": "" })
    };

    var userId = event.queryStringParameters.userId;   //見たいユーザのuserId
    var timestamp = Number(event.queryStringParameters.timestamp);

    // //確認
    // response.body = JSON.stringify({
    //     "userId":userId,
    //     "date" :date
    // });
    // callback(null, response);
    // return;

    //正規表現チェック
    var charptn = /^[A-Za-z]\w*[A-Za-z0-9]$/g;
    var cuserId = userId.match(charptn);
    if (!cuserId) {
        response.statusCode = 400;
        response.body = JSON.stringify({ "message": "userIdの入力が正しくありません" });
        callback(null, response);
        return;
    }

    //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
    var param = {
        "TableName": tableName,
        "KeyConditionExpression" : "userId = :uid and #time = :ts",
        "ExpressionAttributeNames" : {
            "#time": "timestamp"
        },
        "ExpressionAttributeValues" : {
            ":uid": userId,
            ":ts": timestamp
        }
    };

    // //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
    // var param = {
    //     "TableName" : tableName,
    //     //キー、インデックスによる検索の定義
    //     "KeyConditionExpression" : "userId = :uid",
    //     //検索値のプレースホルダの定義
    //     "ExpressionAttributeValues" : {
    //         ":uid": userId
    //     }
    // };

    //dynamo.get()でDBからデータを取得
    dynamo.query(param, function (err, data) {
        if (err) {
            //TODO: 取得に失敗した時の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": err
            });
            callback(null, response);
            return;
        } else {
            //TODO: レスポンスボディの設定とコールバックを記述
            response.body = JSON.stringify(data.Items);
            callback(null, response);
            return;
        }

    });
};
