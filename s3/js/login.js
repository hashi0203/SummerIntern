var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        mode: "login",
        submitText: "ログイン",
        toggleText: "新規登録",
        user: {
            "userId": null,
            "password": null,
            "birthday": null
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        if (localStorage.getItem('userId')) {
            this.user.userId = localStorage.getItem('userId');
        }
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
        toggleMode: function() {
            var pwd = document.getElementsByName('password');
            var pwdCheck = document.getElementsByName('password-check');
            for (var i = 0; i < pwd.length; i++){
                pwdCheck[i].removeAttribute('checked');
                pwd[i].setAttribute('type', 'password');
            }
            if (vm.mode == "login") {
                vm.mode = "signup";
                vm.submitText = "新規登録";
                vm.toggleText = "ログイン";
            } else if(vm.mode == "signup") {
                vm.mode = "login";
                vm.submitText = "ログイン";
                vm.toggleText = "新規登録";
            }
        },
        submit: function() {
            if (vm.mode == "login") {
                // APIにPOSTリクエストを送る
                // fetch(url + "/user/login", {
                //     method: "POST",
                //     body: JSON.stringify({
                //         "userId": vm.user.userId,
                //         "password": vm.user.password
                //     })
                // })
                //     .then(function(response) {
                //         if (response.status == 200) {
                //             return response.json();
                //         }
                //         // 200番以外のレスポンスはエラーを投げる
                //         return response.json().then(function(json) {
                //             throw new Error(json.message);
                //         });
                //     })
                //     .then(function(json) {
                //         // レスポンスが200番で返ってきたときの処理はここに記述する
                        // localStorage.setItem('token',json.token);
                        localStorage.setItem('token',100);
                        localStorage.setItem('userId',vm.user.userId);
                        location.href = "./middle.html";
                        alert("loginできました");
                //     })
                //     .catch(function(err) {
                //         // レスポンスがエラーで返ってきたときの処理はここに記述する
                //         alert(err);
                //     });
            } else if (vm.mode == "signup") {
                if (vm.user.password !== vm.user.password2) {
                    alert("passwordが一致しません");
                    return;
                }
                // fetch(url + "/user/signup", {
                //     method: "POST",
                //     body: JSON.stringify({
                //         "userId": vm.user.userId,
                //         "password": vm.user.password,
                //         "birthday": Number(vm.user.birthday)
                //     })
                // })
                //     .then(function(response) {
                //         if (response.status == 200) {
                //             return response.json();
                //         }
                //         // 200番以外のレスポンスはエラーを投げる
                //         return response.json().then(function(json) {
                //             throw new Error(json.message);
                //         });
                //     })
                //     .then(function(json) {
                //         // レスポンスが200番で返ってきたときの処理はここに記述する
                //         fetch(url + "/user/login", {
                //             method: "POST",
                //             body: JSON.stringify({
                //                 "userId": vm.user.userId,
                //                 "password": vm.user.password
                //             })
                //         })
                //             .then(function(response) {
                //                 if (response.status == 200) {
                //                     return response.json();
                //                 }
                //                 // 200番以外のレスポンスはエラーを投げる
                //                 return response.json().then(function(json) {
                //                     throw new Error(json.message);
                //                 });
                //             })
                //             .then(function(json) {
                //                 // レスポンスが200番で返ってきたときの処理はここに記述する
                                // localStorage.setItem('token',json.token);
                                localStorage.setItem('token',100);
                                localStorage.setItem('userId',vm.user.userId);
                                location.href = "./firstData.html";
                //             })
                //             .catch(function(err) {
                //                 // レスポンスがエラーで返ってきたときの処理はここに記述する
                //                 alert(err);
                //             });
                //     })
                //     .catch(function(err) {
                //         // レスポンスがエラーで返ってきたときの処理はここに記述する
                //         alert(err);
                //     });
            }
        },
        hide_show: function(n) {
            var pwd = document.getElementsByName('password');
            var pwdCheck = document.getElementsByName('password-check');
            if(pwdCheck[n].checked) {
                pwd[n].setAttribute('type', 'text');
            } else {
                pwd[n].setAttribute('type', 'password');
            }
        }
    },
});

