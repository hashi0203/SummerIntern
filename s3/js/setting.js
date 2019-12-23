var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        uploadFile: null,
        pic: "hide",
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
            "bloodSugar": null,
            "healthcare": null,
            "notification_meal": null,
            "notification_exercise": null,
            "tone": null,
            "goal": null
        },
        expectedRisk: null,
        goalWeight: null,
        goalFat: null
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
                vm.user.healthcare = json.healthcare;
                vm.user.notification_meal = json.notification_meal;
                vm.user.notification_exercise = json.notification_exercise;
                vm.user.tone = json.tone;
                vm.user.goal = json.goal;
                if (!json.fat) {
                    vm.expectedRisk = 5.2;
                } else {
                    vm.expectedRisk = Math.round((json.fat)/4 * 10)/10;
                }
                var healthcare_on = document.getElementById('healthcare_on');
                var healthcare_off = document.getElementById('healthcare_off');
                if (json.healthcare == 0) {
                    healthcare_on.setAttribute('class', 'ui disabled button');
                    healthcare_off.setAttribute('class', 'ui button');
                } else if (json.healthcare == 1) {
                    healthcare_on.setAttribute('class', 'ui button');
                    healthcare_off.setAttribute('class', 'ui disabled button');
                }
                var meal_on = document.getElementById('meal_on');
                var meal_off = document.getElementById('meal_off');
                if (json.notification_meal == 0) {
                    meal_on.setAttribute('class', 'ui disabled button');
                    meal_off.setAttribute('class', 'ui button');
                } else if (json.notification_meal == 1) {
                    meal_on.setAttribute('class', 'ui button');
                    meal_off.setAttribute('class', 'ui disabled button');
                }
                var exercise_on = document.getElementById('exercise_on');
                var exercise_off = document.getElementById('exercise_off');
                if (json.notification_exercise == 0) {
                    exercise_on.setAttribute('class', 'ui disabled button');
                    exercise_off.setAttribute('class', 'ui button');
                } else if (json.notification_exercise == 1) {
                    exercise_on.setAttribute('class', 'ui button');
                    exercise_off.setAttribute('class', 'ui disabled button');
                }
                var mode0 = document.getElementById('mode0');
                var mode1 = document.getElementById('mode1');
                var mode2 = document.getElementById('mode2');
                if (json.tone == 0) {
                    mode0.setAttribute('class', 'ui disabled button');
                    mode1.setAttribute('class', 'ui button');
                    mode2.setAttribute('class', 'ui button');
                } else if (json.tone == 1) {
                    mode0.setAttribute('class', 'ui button');
                    mode1.setAttribute('class', 'ui disabled button');
                    mode2.setAttribute('class', 'ui button');
                } else if (json.tone == 2) {
                    mode0.setAttribute('class', 'ui button');
                    mode1.setAttribute('class', 'ui button');
                    mode2.setAttribute('class', 'ui disabled button');
                }
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        hide_show: function(n) {
            var pwd = document.getElementsByName('password');
            var pwdCheck = document.getElementsByName('password-check');
            if(pwdCheck[n].checked) {
                pwd[n].setAttribute('type', 'text');
            } else {
                pwd[n].setAttribute('type', 'password');
            }
        },
        selectedFile: function(e) {
            // 選択された File の情報を保存しておく
            vm.pic = "show";
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
                    vm.user.healthcare = json.healthcare;
                    vm.user.notification = json.notification;
                    vm.user.tone = json.tone;
                    vm.user.goal = json.goal;
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                });
        },
        healthcare: function(e) {
            // 選択された File の情報を保存しておく
            var healthcare_on = document.getElementById('healthcare_on');
            var healthcare_off = document.getElementById('healthcare_off');
            if (e == 0) {
                healthcare_on.setAttribute('class', 'ui disabled button');
                healthcare_off.setAttribute('class', 'ui button');
                vm.user.healthcare = 0;
            } else if (e == 1) {
                healthcare_on.setAttribute('class', 'ui button');
                healthcare_off.setAttribute('class', 'ui disabled button');
                vm.user.healthcare = 1;
            }
        },
        mealRemind: function(e) {
            // 選択された File の情報を保存しておく
            var meal_on = document.getElementById('meal_on');
            var meal_off = document.getElementById('meal_off');
            if (e == 0) {
                meal_on.setAttribute('class', 'ui disabled button');
                meal_off.setAttribute('class', 'ui button');
                vm.user.notification_meal = 0;
            } else if (e == 1) {
                meal_on.setAttribute('class', 'ui button');
                meal_off.setAttribute('class', 'ui disabled button');
                vm.user.notification_meal = 1;
            }
        },
        exerciseRemind: function(e) {
            // 選択された File の情報を保存しておく
            var exercise_on = document.getElementById('exercise_on');
            var exercise_off = document.getElementById('exercise_off');
            if (e == 0) {
                exercise_on.setAttribute('class', 'ui disabled button');
                exercise_off.setAttribute('class', 'ui button');
                vm.user.notification_exercise = 0;
            } else if (e == 1) {
                exercise_on.setAttribute('class', 'ui button');
                exercise_off.setAttribute('class', 'ui disabled button');
                vm.user.notification_exercise = 1;
            }
        },
        modeChange: function(e) {
            // 選択された File の情報を保存しておく
            var mode0 = document.getElementById('mode0');
            var mode1 = document.getElementById('mode1');
            var mode2 = document.getElementById('mode2');
            if (e == 0) {
                mode0.setAttribute('class', 'ui disabled button');
                mode1.setAttribute('class', 'ui button');
                mode2.setAttribute('class', 'ui button');
                vm.user.tone = 0;
            } else if (e == 1) {
                mode0.setAttribute('class', 'ui button');
                mode1.setAttribute('class', 'ui disabled button');
                mode2.setAttribute('class', 'ui button');
                vm.user.tone = 1;
            } else if (e == 2) {
                mode0.setAttribute('class', 'ui button');
                mode1.setAttribute('class', 'ui button');
                mode2.setAttribute('class', 'ui disabled button');
                vm.user.tone = 2;
            }
        },
        showGoal: function () {
            if (vm.user.goal) {
                vm.goalFat = vm.user.goal * 4;
                vm.goalWeight = vm.user.weight + vm.goalFat - vm.user.fat;
                vm.mode = "show";
            } else {
                vm.mode = "error";
            }
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
                    "bloodSugar": vm.user.bloodSugar,
                    "healthcare": vm.user.healthcare,
                    "notification_meal": vm.user.notification_meal,
                    "notification_exercise": vm.user.notification_exercise,
                    "tone": vm.user.tone,
                    "goal": vm.user.goal
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
