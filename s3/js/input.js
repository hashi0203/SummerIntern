var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        uploadFile: null,
        user: {
            "userId": null,
            "timestamp": null,
            "breakfast1": 0,
            "lunch1": 0,
            "dinner1": 0,
            "snack1": 0,
            "breakfast2": 0,
            "lunch2": 0,
            "dinner2": 0,
            "snack2": 0,
            "breakfast3": 0,
            "lunch3": 0,
            "dinner3": 0,
            "snack3": 0,
            "breakfast4": 0,
            "lunch4": 0,
            "dinner4": 0,
            "snack4": 0,
            "breakfast5": 0,
            "lunch5": 0,
            "dinner5": 0,
            "snack5": 0,
            "stepCount": null,
            "distCount": null,
            "bodyWeight": null,
            "bodyFat": null,
            "maxBldPrs": null,
            "minBldPrs": null,
            "healthcare": null,
        },
        time: {
            "year": null,
            "month": null,
            "day": null,
            "date": null
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        // if (localStorage.getItem('token') !== "mti2017") {
        //     location.href = "./login.html";
        //     return;
        // }
        var d = new Date();
        this.time.year  = d.getFullYear();
        this.time.month = d.getMonth() + 1;
        this.time.day   = d.getDate();
        this.time.date = this.time.month + "月" + this.time.day + "日";
        this.user.timestamp = this.time.year * 10000 + this.time.month * 100 + this.time.day;
        this.user.userId = localStorage.getItem('userId');
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
                if (json.length !== 0) {
                    json = json[0];
                    if (json.breakfast1) {
                        vm.user.breakfast1 = json.breakfast1;
                    }
                    if (json.lunch1) {
                        vm.user.lunch1 = json.lunch1;
                    }
                    if (json.dinner1) {
                        vm.user.dinner1 = json.dinner1;
                    }
                    if (json.snack1) {
                        vm.user.snack1 = json.snack1;
                    }
                    if (json.breakfast2) {
                        vm.user.breakfast2 = json.breakfast2;
                    }
                    if (json.lunch2) {
                        vm.user.lunch2 = json.lunch2;
                    }
                    if (json.dinner2) {
                        vm.user.dinner2 = json.dinner2;
                    }
                    if (json.snack2) {
                        vm.user.snack2 = json.snack2;
                    }
                    if (json.breakfast3) {
                        vm.user.breakfast3 = json.breakfast3;
                    }
                    if (json.lunch3) {
                        vm.user.lunch3 = json.lunch3;
                    }
                    if (json.dinner3) {
                        vm.user.dinner3 = json.dinner3;
                    }
                    if (json.snack3) {
                        vm.user.snack3 = json.snack3;
                    }
                    if (json.breakfast4) {
                        vm.user.breakfast4 = json.breakfast4;
                    }
                    if (json.lunch4) {
                        vm.user.lunch4 = json.lunch4;
                    }
                    if (json.dinner4) {
                        vm.user.dinner4 = json.dinner4;
                    }
                    if (json.snack4) {
                        vm.user.snack4 = json.snack4;
                    }
                    if (json.breakfast5) {
                        vm.user.breakfast5 = json.breakfast5;
                    }
                    if (json.lunch5) {
                        vm.user.lunch5 = json.lunch5;
                    }
                    if (json.dinner5) {
                        vm.user.dinner5 = json.dinner5;
                    }
                    if (json.snack5) {
                        vm.user.snack5 = json.snack5;
                    }
                    if (json.bodyWeight) {
                        vm.user.bodyWeight = json.bodyWeight;
                    }
                    if (json.bodyFat) {
                        vm.user.bodyFat = json.bodyFat;
                    }
                    if (json.maxBldPrs) {
                        vm.user.maxBldPrs = json.maxBldPrs;
                    }
                    if (json.minBldPrs) {
                        vm.user.minBldPrs = json.minBldPrs;
                    }
                }
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
                        vm.user.healthcare = json.healthcare;
                        if (json.stepCount) {
                            vm.user.stepCount = json.stepCount;
                        } else {
                            if (json.healthcare == 0) {
                                vm.user.stepCount = 4621;
                            } else {
                                vm.user.stepCount = 0;
                            }
                        }
                        if (json.distCount) {
                            vm.user.distCount = json.distCount;
                        } else {
                            if (json.healthcare == 0) {
                                vm.user.distCount = 2.1;
                            } else {
                                vm.user.distCount = 0;
                            }
                        }
                    })
                    .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                    });
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        goBefore: function() {
            var d = new Date(vm.time.year, vm.time.month-1, vm.time.day);
            d.setDate(d.getDate() - 1);
            vm.time.year  = d.getFullYear();
            vm.time.month = d.getMonth() + 1;
            vm.time.day   = d.getDate();
            vm.time.date = vm.time.month + "月" + vm.time.day + "日";
            vm.user.timestamp = vm.time.year * 10000 + vm.time.month * 100 + vm.time.day;
            vm.user.breakfast1 = 0;
            vm.user.lunch1 = 0;
            vm.user.dinner1 = 0;
            vm.user.snack1 = 0;
            vm.user.breakfast2 = 0;
            vm.user.lunch2 = 0;
            vm.user.dinner2 = 0;
            vm.user.snack2 = 0;
            vm.user.breakfast3 = 0;
            vm.user.lunch3 = 0;
            vm.user.dinner3 = 0;
            vm.user.snack3 = 0;
            vm.user.breakfast4 = 0;
            vm.user.lunch4 = 0;
            vm.user.dinner4 = 0;
            vm.user.snack4 = 0;
            vm.user.breakfast5 = 0;
            vm.user.lunch5 = 0;
            vm.user.dinner5 = 0;
            vm.user.snack5 = 0;
            vm.user.stepCount = null;
            vm.user.distCount = null;
            vm.user.bodyWeight = null;
            vm.user.bodyFat = null;
            vm.user.maxBldPrs = null;
            vm.user.minBldPrs = null;
            fetch(url + "/user/input" +
                "?userId=" + localStorage.getItem('userId') + "&timestamp=" + vm.user.timestamp, {
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
                    if (json.length == 0) {
                        if (vm.user.healthcare == 0) {
                            vm.user.stepCount = 4621;
                            vm.user.distCount = 2.1;
                        } else {
                            vm.user.stepCount = 0;
                            vm.user.distCount = 0;
                        }
                        return;
                    }
                    json = json[0];
                    if (json.breakfast1) {
                        vm.user.breakfast1 = json.breakfast1;
                    }
                    if (json.lunch1) {
                        vm.user.lunch1 = json.lunch1;
                    }
                    if (json.dinner1) {
                        vm.user.dinner1 = json.dinner1;
                    }
                    if (json.snack1) {
                        vm.user.snack1 = json.snack1;
                    }
                    if (json.breakfast2) {
                        vm.user.breakfast2 = json.breakfast2;
                    }
                    if (json.lunch2) {
                        vm.user.lunch2 = json.lunch2;
                    }
                    if (json.dinner2) {
                        vm.user.dinner2 = json.dinner2;
                    }
                    if (json.snack2) {
                        vm.user.snack2 = json.snack2;
                    }
                    if (json.breakfast3) {
                        vm.user.breakfast3 = json.breakfast3;
                    }
                    if (json.lunch3) {
                        vm.user.lunch3 = json.lunch3;
                    }
                    if (json.dinner3) {
                        vm.user.dinner3 = json.dinner3;
                    }
                    if (json.snack3) {
                        vm.user.snack3 = json.snack3;
                    }
                    if (json.breakfast4) {
                        vm.user.breakfast4 = json.breakfast4;
                    }
                    if (json.lunch4) {
                        vm.user.lunch4 = json.lunch4;
                    }
                    if (json.dinner4) {
                        vm.user.dinner4 = json.dinner4;
                    }
                    if (json.snack4) {
                        vm.user.snack4 = json.snack4;
                    }
                    if (json.breakfast5) {
                        vm.user.breakfast5 = json.breakfast5;
                    }
                    if (json.lunch5) {
                        vm.user.lunch5 = json.lunch5;
                    }
                    if (json.dinner5) {
                        vm.user.dinner5 = json.dinner5;
                    }
                    if (json.snack5) {
                        vm.user.snack5 = json.snack5;
                    }
                    if (json.stepCount) {
                        vm.user.stepCount = json.stepCount;
                    } else {
                        if (vm.user.healthcare == 0) {
                            vm.user.stepCount = 4621;
                        } else {
                            vm.user.stepCount = 0;
                        }
                    }
                    if (json.distCount) {
                        vm.user.distCount = json.distCount;
                    } else {
                        if (vm.user.healthcare == 0) {
                            vm.user.distCount = 2.1;
                        } else {
                            vm.user.distCount = 0;
                        }
                    }
                    if (json.bodyWeight) {
                        vm.user.bodyWeight = json.bodyWeight;
                    }
                    if (json.bodyFat) {
                        vm.user.bodyFat = json.bodyFat;
                    }
                    if (json.maxBldPrs) {
                        vm.user.maxBldPrs = json.maxBldPrs;
                    }
                    if (json.minBldPrs) {
                        vm.user.minBldPrs = json.minBldPrs;
                    }
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        },
        goAfter: function() {
            var now = new Date();
            var d = new Date(vm.time.year, vm.time.month-1, vm.time.day);
            d.setDate(d.getDate() + 1);
            if (d > now) {
                alert("今日より先には進めません");
                return;
            }
            vm.time.year  = d.getFullYear();
            vm.time.month = d.getMonth() + 1;
            vm.time.day   = d.getDate();
            vm.time.date = vm.time.month + "月" + vm.time.day + "日";
            vm.user.timestamp = vm.time.year * 10000 + vm.time.month * 100 + vm.time.day;
            vm.user.breakfast1 = 0;
            vm.user.lunch1 = 0;
            vm.user.dinner1 = 0;
            vm.user.snack1 = 0;
            vm.user.breakfast2 = 0;
            vm.user.lunch2 = 0;
            vm.user.dinner2 = 0;
            vm.user.snack2 = 0;
            vm.user.breakfast3 = 0;
            vm.user.lunch3 = 0;
            vm.user.dinner3 = 0;
            vm.user.snack3 = 0;
            vm.user.breakfast4 = 0;
            vm.user.lunch4 = 0;
            vm.user.dinner4 = 0;
            vm.user.snack4 = 0;
            vm.user.breakfast5 = 0;
            vm.user.lunch5 = 0;
            vm.user.dinner5 = 0;
            vm.user.snack5 = 0;
            vm.user.stepCount = null;
            vm.user.distCount = null;
            vm.user.bodyWeight = null;
            vm.user.bodyFat = null;
            vm.user.maxBldPrs = null;
            vm.user.minBldPrs = null;
            fetch(url + "/user/input" +
                "?userId=" + localStorage.getItem('userId') + "&timestamp=" + vm.user.timestamp, {
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
                    if (json.length == 0) {
                        if (vm.user.healthcare == 0) {
                            vm.user.stepCount = 4621;
                            vm.user.distCount = 2.1;
                        } else {
                            vm.user.stepCount = 0;
                            vm.user.distCount = 0;
                        }
                        return;
                    }
                    json = json[0];
                    if (json.breakfast1) {
                        vm.user.breakfast1 = json.breakfast1;
                    }
                    if (json.lunch1) {
                        vm.user.lunch1 = json.lunch1;
                    }
                    if (json.dinner1) {
                        vm.user.dinner1 = json.dinner1;
                    }
                    if (json.snack1) {
                        vm.user.snack1 = json.snack1;
                    }
                    if (json.breakfast2) {
                        vm.user.breakfast2 = json.breakfast2;
                    }
                    if (json.lunch2) {
                        vm.user.lunch2 = json.lunch2;
                    }
                    if (json.dinner2) {
                        vm.user.dinner2 = json.dinner2;
                    }
                    if (json.snack2) {
                        vm.user.snack2 = json.snack2;
                    }
                    if (json.breakfast3) {
                        vm.user.breakfast3 = json.breakfast3;
                    }
                    if (json.lunch3) {
                        vm.user.lunch3 = json.lunch3;
                    }
                    if (json.dinner3) {
                        vm.user.dinner3 = json.dinner3;
                    }
                    if (json.snack3) {
                        vm.user.snack3 = json.snack3;
                    }
                    if (json.breakfast4) {
                        vm.user.breakfast4 = json.breakfast4;
                    }
                    if (json.lunch4) {
                        vm.user.lunch4 = json.lunch4;
                    }
                    if (json.dinner4) {
                        vm.user.dinner4 = json.dinner4;
                    }
                    if (json.snack4) {
                        vm.user.snack4 = json.snack4;
                    }
                    if (json.breakfast5) {
                        vm.user.breakfast5 = json.breakfast5;
                    }
                    if (json.lunch5) {
                        vm.user.lunch5 = json.lunch5;
                    }
                    if (json.dinner5) {
                        vm.user.dinner5 = json.dinner5;
                    }
                    if (json.snack5) {
                        vm.user.snack5 = json.snack5;
                    }
                    if (json.stepCount) {
                        vm.user.stepCount = json.stepCount;
                    } else {
                        if (vm.user.healthcare == 0) {
                            vm.user.stepCount = 4621;
                        } else {
                            vm.user.stepCount = 0;
                        }
                    }
                    if (json.distCount) {
                        vm.user.distCount = json.distCount;
                    } else {
                        if (vm.user.healthcare == 0) {
                            vm.user.distCount = 2.1;
                        } else {
                            vm.user.distCount = 0;
                        }
                    }
                    if (json.bodyWeight) {
                        vm.user.bodyWeight = json.bodyWeight;
                    }
                    if (json.bodyFat) {
                        vm.user.bodyFat = json.bodyFat;
                    }
                    if (json.maxBldPrs) {
                        vm.user.maxBldPrs = json.maxBldPrs;
                    }
                    if (json.minBldPrs) {
                        vm.user.minBldPrs = json.minBldPrs;
                    }
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        },
        doSave: function() {
            // レスポンスが200番で返ってきたときの処理はここに記述する
            fetch(url + "/user/input", {
                method: "PUT",
                headers:new Headers({
                    "Authorization": localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    "userId": vm.user.userId,
                    "timestamp": vm.user.timestamp,
                    "breakfast1": vm.user.breakfast1,
                    "lunch1": vm.user.lunch1,
                    "dinner1": vm.user.dinner1,
                    "snack1": vm.user.snack1,
                    "breakfast2": vm.user.breakfast2,
                    "lunch2": vm.user.lunch2,
                    "dinner2": vm.user.dinner2,
                    "snack2": vm.user.snack2,
                    "breakfast3": vm.user.breakfast3,
                    "lunch3": vm.user.lunch3,
                    "dinner3": vm.user.dinner3,
                    "snack3": vm.user.snack3,
                    "breakfast4": vm.user.breakfast4,
                    "lunch4": vm.user.lunch4,
                    "dinner4": vm.user.dinner4,
                    "snack4": vm.user.snack4,
                    "breakfast5": vm.user.breakfast5,
                    "lunch5": vm.user.lunch5,
                    "dinner5": vm.user.dinner5,
                    "snack5": vm.user.snack5,
                    "stepCount": vm.user.stepCount,
                    "distCount": vm.user.distCount,
                    "bodyWeight": vm.user.bodyWeight,
                    "bodyFat": vm.user.bodyFat,
                    "maxBldPrs": vm.user.maxBldPrs,
                    "minBldPrs": vm.user.minBldPrs
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
                    alert("更新できました");
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                    alert(err);
                });
        }
    },
});

