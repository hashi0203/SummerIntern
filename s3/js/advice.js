var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        user: {
            "userId": null,
            "calory": 0,
            "eatnum": 0,
            "distCount": null,
            "tone": null
        },
        time: {
            "year": null,
            "month": null,
            "day": null,
            "date": null
        },
        mode: {
            "meal": null,
            "exercise": null
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        // if (localStorage.getItem('token') !== "mti2017") {
        //     location.href = "./login.html";
        //     return;
        // }
        this.mode.meal = 0;
        this.mode.exercise = 0;
        this.user.tone = 0;
        var d = new Date();
        this.time.year  = d.getFullYear();
        this.time.month = d.getMonth() + 1;
        this.time.day   = d.getDate();
        this.time.date = this.time.month + "月" + this.time.day + "日";
        this.user.timestamp = this.time.year * 10000 + this.time.month * 100 + this.time.day;
        this.user.userId = localStorage.getItem('userId');
        console.log(this.user.userId);
        console.log(url + "/user/input" + "?userId=" + this.user.userId + "&timestamp=" + this.user.timestamp);
        fetch(url + "/user/input" +
            "?userId=" + this.user.userId + "&timestamp=" + this.user.timestamp, {
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
                json = json[0];
                if (json.breakfast1) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.breakfast1;
                }
                if (json.lunch1) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.lunch1;
                }
                if (json.dinner1) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.dinner1;
                }
                if (json.snack1) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.snack1;
                }
                if (json.breakfast2) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.breakfast2;
                }
                if (json.lunch2) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.lunch2;
                }
                if (json.dinner2) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.dinner2;
                }
                if (json.snack2) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.snack2;
                }
                if (json.breakfast3) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.breakfast3;
                }
                if (json.lunch3) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.lunch3;
                }
                if (json.dinner3) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.dinner3;
                }
                if (json.snack3) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.snack3;
                }
                if (json.breakfast4) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.breakfast4;
                }
                if (json.lunch4) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.lunch4;
                }
                if (json.dinner4) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.dinner4;
                }
                if (json.snack4) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.snack4;
                }
                if (json.breakfast5) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.breakfast5;
                }
                if (json.lunch5) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.lunch5;
                }
                if (json.dinner5) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.dinner5;
                }
                if (json.snack5) {
                    vm.user.eatnum += 1;
                    vm.user.calory += json.snack5;
                }
                if (json.distCount) {
                    vm.user.distCount = json.distCount;
                }
                if (vm.user.calory/vm.user.eatnum < 0.1) {
                    vm.mode.meal = 0;
                } else if (vm.user.calory/vm.user.eatnum > 0.5) {
                    vm.mode.meal = 2;
                } else {
                    vm.mode.meal = 1;
                }
                if (vm.user.distcount < 2) {
                    vm.mode.exercise = 0;
                } else if (vm.user.distcount > 5) {
                    vm.mode.exercise = 2;
                } else {
                    vm.mode.exercise = 1;
                }
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
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
                vm.user.tone = json.tone;
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
});

