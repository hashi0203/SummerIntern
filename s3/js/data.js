var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
        mode: "mode0"
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
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
                if (json.tone == 0) {
                    setTimeout(function(){alert("リスクが少し上がってきているので気を付けてくださいね！")},2000);
                } else if (json.tone == 1) {
                    setTimeout(function(){alert("リスクが上がっています。気を付けてください。")},2000);
                } else {
                    setTimeout(function(){alert("危険な状態です!!危険な...状態です!!!!!!")},2000);
                }
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
            });
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
        toggleMode: function(e) {
            if (e == 0) {
                vm.mode = "mode0";
            } else if(e == 1) {
                vm.mode = "mode1";
            } else if(e == 2) {
                vm.mode = "mode2";
            } else if(e == 3) {
                vm.mode = "mode3";
            }
        },
    },
});
