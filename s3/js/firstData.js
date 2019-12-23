var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        uploadFile: null,
        mode: "hide",
        user: {
            "userId": null,
            "password": null,
            "birthday": null,
            "sex": null,
            "weight": null,
            "height": null,
            "fat": null,
            "smoke": null,
            "alcohol": null,
            "maxPressure": null,
            "minPressure": null,
            "urinalysis": null,
            "xray": null,
            "cardiogram": null,
            "liver": null,
            "lipid": null,
            "bloodSugar": null
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        // if (localStorage.getItem('token') !== "mti2017") {
        //     location.href = "./login.html";
        //     return;
        // }
        fetch(url + "/user/setting" +
            "?userId=" + localStorage.getItem('userId'), {
            method: "GET"
        })
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                }
                // 200番以外のレスポンスはエラーを投げる
                return response.json().then(function(json) {
                    throw new Error(json.message);
                });
            })
            .then(function(json) {
                // レスポンスが200番で返ってきたときの処理はここに記述する
                vm.user.userId = json.userId;
                vm.user.password = json.password;
                vm.user.birthday = json.birthday;
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        selectedFile: function(e) {
            // 選択された File の情報を保存しておく
            vm.mode = "show";
            e.preventDefault();
            let files = e.target.files;
            this.uploadFile = files[0];
            var preview = document.getElementById('preview');
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            this.upload();
        },
        upload: function () {
            fetch(url + "/user/medicalcheck" +
                "?userId=" + localStorage.getItem('userId'), {
                method: "GET"
            })
                .then(function(response) {
                    if (response.status == 200) {
                        return response.json();
                    }
                    // 200番以外のレスポンスはエラーを投げる
                    return response.json().then(function(json) {
                        throw new Error(json.message);
                    });
                })
                .then(function(json) {
                    // レスポンスが200番で返ってきたときの処理はここに記述する
                    vm.user.sex = json.sex;
                    vm.user.weight = json.weight;
                    vm.user.height = json.height;
                    vm.user.fat = json.fat;
                    vm.user.smoke = json.smoke;
                    vm.user.alcohol = json.alcohol;
                    vm.user.maxPressure = json.maxPressure;
                    vm.user.minPressure = json.minPressure;
                    vm.user.urinalysis = json.urinalysis;
                    vm.user.xray = json.xray;
                    vm.user.cardiogram = json.cardiogram;
                    vm.user.liver = json.liver;
                    vm.user.lipid = json.lipid;
                    vm.user.bloodSugar = json.bloodSugar;
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        },
        doSave: function() {
            // レスポンスが200番で返ってきたときの処理はここに記述する
            fetch(url + "/user", {
                method: "PUT",
                headers:new Headers({
                    "Authorization": localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    "userId": vm.user.userId,
                    "password": vm.user.password,
                    "birthday": vm.user.birthday,
                    "sex": vm.user.sex,
                    "weight": vm.user.weight,
                    "height": vm.user.height,
                    "fat": vm.user.fat,
                    "smoke": vm.user.smoke,
                    "alcohol": vm.user.alcohol,
                    "maxPressure": vm.user.maxPressure,
                    "minPressure": vm.user.minPressure,
                    "urinalysis": vm.user.urinalysis,
                    "xray": vm.user.xray,
                    "cardiogram": vm.user.cardiogram,
                    "liver": vm.user.liver,
                    "lipid": vm.user.lipid,
                    "bloodSugar": vm.user.bloodSugar
                })
            })
                .then(function(response) {
                    if (response.status == 200) {
                        return response.json();
                    }
                    // 200番以外のレスポンスはエラーを投げる
                    return response.json().then(function(json) {
                        throw new Error(json.message);
                    });
                })
                .then(function(json) {
                    // レスポンスが200番で返ってきたときの処理はここに記述する
                    location.href = "./mode.html";
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                    // alert(err);
                    location.href = "./mode.html";
                });
        }
    },
});
