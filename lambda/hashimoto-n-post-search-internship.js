var AWS = require("aws-sdk");
var dynamo = new AWS.DynamoDB.DocumentClient();
var tableName = "post";

exports.handler = (event, context, callback) => {
    var response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*"
        },
        body: JSON.stringify({"message" : ""})
    };

    //クエリストリングを取得
    var userId = event.queryStringParameters.userId;
    var start = event.queryStringParameters.start;
    var end = event.queryStringParameters.end;
    var category = event.queryStringParameters.category;
    //TODO: query()に渡すparamを宣言
    var param = {
        "TableName" : tableName,
        //キー、インデックスによる検索の定義
        "KeyConditionExpression" :
            "userId = :uid AND ((NOT :start) OR #timestamp >= :start) AND ((NOT :end) OR #timestamp <= :end)",
        //プライマリーキー以外の属性でのフィルタ
        "FilterExpression":
            "(NOT :category) OR #category = :category",
        //属性名のプレースホルダの定義
        "ExpressionAttributeNames" : {
            "#timestamp": "timestamp",
            "#category": "category"
        },
        //検索値のプレースホルダの定義
        "ExpressionAttributeValues" : {
            ":uid": userId,
            ":start": start,
            ":end": end,
            ":category": category
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
            response.body = JSON.stringify({"message" : "該当する投稿が存在しません"});
            callback(null, response);
            return;
        }
        //TODO: 認証が成功した場合のレスポンスボディとコールバックを記述
        response.body = JSON.stringify(data.Items);
        callback(null, response);
        return;
    });
};
