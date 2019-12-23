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

    //bodyが空だったら返す
    if (!body) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "bodyが空です"});
        callback(null,response);
        return;
    }

    //bodyの中身を取得
    var userId = body.userId;
    var password = body.password;
    var birthday = body.birthday;
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
    var healthcare = body.healthcare;
    var notification_meal = body.notification_meal;
    var notification_exercise = body.notification_exercise;
    var tone = body.tone;
    var goal = body.goal;


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
    var cpassword = password.match(charptn);
    if (!cpassword) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "passwordの入力が正しくありません"});
        callback(null,response);
        return;
    }
    if (!(birthday >= 0)) {
        response.statusCode = 400;
        response.body = JSON.stringify({"message": "birthdayの入力が正しくありません"});
        callback(null,response);
        return;
    }
    birthday = Number(birthday);

    //既に登録されているか確認
    var param = {
        "TableName": tableName,
        "Key": {
            "userId": userId
        }
    };
    dynamo.get(param, function(err, data){
        if(err){
            //TODO: 取得に失敗した時の処理を記述
            response.statusCode = 500;
            response.body = JSON.stringify({
                "message": "予期せぬエラーが発生しました"
            });
            callback(null, response);
            return;
        }
        if (!data.Item){
            response.statusCode = 400;
            response.body = JSON.stringify({
                "message": "そのユーザーは存在しません"
            });
            callback(null, response);
            return;
        }
    });

    //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    param = {
        "TableName": tableName,
        "Item": {
            "userId": userId,
            "password": password,
            "birthday": birthday,
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
            "bloodSugar": bloodSugar,
            "healthcare": healthcare,
            "notification_meal": notification_meal,
            "notification_exercise": notification_exercise,
            "tone": tone,
            "goal": goal
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
            if (param.Item) {
                delete param.Item.password;
            }
            response.body = JSON.stringify(param.Item);
            callback(null, response);
            return;
        }
    });
};
