var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        mode: "default",
        submitText: "更新",
        toggleText: "パスワード変更",
        user: {
            "userId": null,
            "password": null,
            "nickname": null,
            "age": null
        }
    },
    computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        if (localStorage.getItem('token') !== "mti2017") {
            location.href = "./login.html";
            return;
        }
        fetch(url + "/user" +
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
                vm.user.nickname = json.nickname;
                vm.user.age = json.age;
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
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
            if (vm.mode == "default") {
                vm.mode = "pass_change";
                vm.submitText = "パスワード更新";
                vm.toggleText = "基本情報変更";
            } else if(vm.mode == "pass_change") {
                vm.mode = "default";
                vm.submitText = "更新";
                vm.toggleText = "パスワード変更";
            }
        },
        submit: function() {
            // 入力されたpasswordを使ってログインできるか確かめる
            fetch(url + "/user/login", {
                method: "POST",
                body: JSON.stringify({
                    "userId": vm.user.userId,
                    "password": vm.user.password
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
                    if (vm.mode == "default") {
                        fetch(url + "/user", {
                            method: "PUT",
                            headers:new Headers({
                                "Authorization": localStorage.getItem('token')
                            }),
                            body: JSON.stringify({
                                "userId": vm.user.userId,
                                "password": vm.user.password,
                                "nickname": vm.user.nickname,
                                "age": Number(vm.user.age)
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
                    } else if (vm.mode == "pass_change") {
                        if (vm.user.newpass1 !== vm.user.newpass2) {
                            alert("passwordが一致しません");
                            return;
                        }
                        fetch(url + "/user", {
                            method: "PUT",
                            headers:new Headers({
                                "Authorization": localStorage.getItem('token')
                            }),
                            body: JSON.stringify({
                                "userId": vm.user.userId,
                                "password": vm.user.newpass1,
                                "nickname": vm.user.nickname,
                                "age": Number(vm.user.age)
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
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                    alert(err);
                });
        },
        logout: function() {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            location.href = "./login.html";
            alert("ログアウトしました");
        },
        deleteUser: function() {
            if (confirm("本当に退会しますか？")) {
                fetch(url + "/user", {
                    method: "DELETE",
                    headers:new Headers({
                        "Authorization": localStorage.getItem('token')
                    }),
                    body: JSON.stringify({
                        "userId": vm.user.userId,
                        "password": vm.user.password,
                        "nickname": vm.user.nickname,
                        "age": Number(vm.user.age)
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
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        location.href = "./login.html";
                        alert("退会できました");
                    })
                    .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                        alert(err);
                    });
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
