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
    var password = body.password;

    //userテーブルのvalidation(paramのどれかが空だったら返す)
    if (!userId || !password) {
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
    
    //TODO: query()に渡すparamを宣言
    var param = {
        "TableName" : tableName,
        //キー、インデックスによる検索の定義
        "KeyConditionExpression" :
            "userId = :uid",
        //プライマリーキー以外の属性でのフィルタ
        "FilterExpression":
            "#password = :password",
        //属性名のプレースホルダの定義
        "ExpressionAttributeNames" : {
            "#password": "password"
        },
        //検索値のプレースホルダの定義
        "ExpressionAttributeValues" : {
            ":uid": userId,
            ":password": password
        }
    };

    //dynamo.query()を用いてuserIdとpasswordが一致するデータの検索
    dynamo.query(param, function(err, data){
        //userの取得に失敗
        if(err){
            response.statusCode = 500;
            response.body = JSON.stringify({"message" : "予期せぬエラーが発生しました"});
            callback(null, response);
            return;
        }
        //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：data.Itemsの中身が空)
        if (!data.Items.length) {
            response.statusCode = 401;
            response.body = JSON.stringify({"message" : "userIdまたはpasswordが一致しません"});
            callback(null, response);
            return;
        }
        //TODO: 認証が成功した場合のレスポンスボディとコールバックを記述
        response.body = JSON.stringify({"token" : "mti2017"});
        callback(null, response);
        return;
    });
};
