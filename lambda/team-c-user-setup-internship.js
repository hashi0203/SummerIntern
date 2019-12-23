var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "team-c-PersonalSetting";

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
    var birthday = body.birthday;
    var password = body.password;
    var notice = body.notice;
    var mode = body.mode;
    var goal = body.goal;

    //userテーブルのvalidation(paramのどれかが空だったら返す)
    if (!userId || !birthday || !password || !notice || !mode || !goal) {
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
    var cbirthday = birthday.match(charptn);
    if (!cbirthday) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "birthdayの入力が正しくありません"});
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
    var cnotice = notice.match(charptn);
    if (!cnotice) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "noticeの入力が正しくありません"});
        callback(null,response);
        return;
    }
    var cmode = mode.match(charptn);
    if (!cnotice) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "modeの入力が正しくありません"});
        callback(null,response);
        return;
    }
    var cgoal = mode.match(charptn);
    if (!cgoal) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "goalの入力が正しくありません"});
        callback(null,response);
        return;
    }

    //TODO: paramに更新対象のテーブル名と更新内容を記述
    var param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "birthday": birthday,
            "password": password,
            "notice": notice,
            "mode": mode,
            "goal": goal
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
