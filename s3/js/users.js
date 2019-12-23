var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
        // Vue.jsで使う変数はここに記述する
        mode: "init",
        users: {},
        query: {
            nickname: null,
        },
        compute: {
            nickname: null,
        }
    },
    computed: {
        // 計算した結果を変数として利用したいときはここに記述する
        filteredUsers: function() {
            var result = this.users;
            vm.compute.nickname = vm.query.nickname;
            vm.mode = "display";
            result = result.filter(function (target) {
                return target.userId;
            });
            result = result.filter(function (target) {
                return Number(target.age) >= 0;
            });
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        // if (localStorage.getItem('token') !== "mti2017") {
        //     location.href = "./login.html";
        //     return;
        // }
        fetch(url + "/users", {
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
                vm.users = json.users;
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        toggleMode: function() {
            if (vm.mode == "init" || vm.mode == "display") {
                vm.mode = "compute";
            }
        }
    },
});
