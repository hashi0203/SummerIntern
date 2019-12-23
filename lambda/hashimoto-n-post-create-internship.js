var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "post";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        // headers: {
        //     "Access-Control-Allow-Origin" : "*"
        // },
        body: JSON.stringify({"message" : ""})
    };

    console.log(event.body);
    var body = JSON.parse(event.body);
    // //bodyが空だったら返す
    if(!body){
        response.statusCode = 400;
        response.body = JSON.stringify({"message" : "bodyが空です"});
        callback(null, response);
        return;
    }

    if (!body.text) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "本文を入力してください"});
        callback(null,response);
        return;
    }

    //TODO: 取得したいテーブル名をparamオブジェクトに設定する（中身を記述）
    var param = {
        "TableName": tableName,
        "Item": {
            "userId": body.userId,
            "text": body.text,
            "category": body.category,
            "timestamp": Date.now()
        } 
    };

    //dynamo.put()でDBにデータを登録
    dynamo.put(param, function(err, data) {
        if (err) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                "message" : "データの登録に失敗しました"
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
