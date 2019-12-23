var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "user";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    var body = JSON.parse(event.body);

    // bodyが空だったら返す
    if (!body) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "bodyが空です"});
        callback(null,response);
        return;
    }

    //bodyの中身を取得
    var userId = body.userId;
    var age = body.age;
    var password = body.password;
    var nickname = body.nickname;

    //userテーブルのvalidation(paramのどれかが空だったら返す)
    if (!userId || !password || !nickname || age == null) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "パラメータが足りません"});
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
    var cpassword = password.match(charptn);
    if (!cpassword) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "passwordの入力が正しくありません"});
        callback(null,response);
        return;
    }
    var cnickname = nickname.match(charptn);
    if (!cnickname) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "nicknameの入力が正しくありません"});
        callback(null,response);
        return;
    }
    if (!(age >= 0)) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "ageの入力が正しくありません"});
        callback(null,response);
        return;
    }
    age = Number(age);

    //TODO: paramに更新対象のテーブル名と更新内容を記述
    var param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "password": password,
            "age": age,
            "nickname": nickname
        }
    };

    //dynamo.put()を用いてデータの更新
    dynamo.put(param, function(err, data){
        if(err){
            //TODO: 更新に失敗した場合の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "予期せぬエラーが発生しました"
            });
            callback(null, response);
            return;
        }else{
            //TODO: 更新に成功した場合の処理を記述
            response.body = JSON.stringify(param.Item);
            callback(null, response);
            return;
        }
    });
};
