var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
        // Vue.jsで使う変数はここに記述する
        mode: "display",
        posts: {},
        cuid: localStorage.getItem('userId'),
        post: {
            text: null,
            category: null
        },
        query: {
            userId: null,
            category: null,
            start: null,
            end: null
        }
    },
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        // APIにGETリクエストを送る
        fetch(url + "/posts", {
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
                vm.posts = json.posts;
            })
            .catch(function(err) {
                // レスポンスがエラーで返ってきたときの処理はここに記述する
                alert(err);
            });
    },
    methods: {
        // Vue.jsで使う関数はここで記述する
        toggleMode: function() {
            if (vm.mode == "none" || vm.mode == "display") {
                vm.mode = "compute";
            }
        },
        doPost: function() {
            fetch(url + "/post", {
                method: "POST",
                body: JSON.stringify({
                    "userId": localStorage.getItem('userId'),
                    "text": vm.post.text,
                    "category": vm.post.category
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
                    alert("投稿できました");
                    return;
                })
                .catch(function(err) {
                    // レスポンスがエラーで返ってきたときの処理はここに記述する
                    alert(err);
                    return;
                });
        },
        deletePost: function(id,stamp) {
            if (id !== localStorage.getItem('userId')) {
                alert("他の人の投稿は削除できません");
                return;
            }
            if (confirm("本当に削除しますか？")) {
                fetch(url + "/post", {
                    method: "DELETE",
                    headers:new Headers({
                        "Authorization": localStorage.getItem('token')
                    }),
                    body: JSON.stringify({
                        "userId": localStorage.getItem('userId'),
                        "timestamp": stamp
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
                        fetch(url + "/posts", {
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
                                vm.posts = json.posts;
                            })
                            .catch(function(err) {
                                // レスポンスがエラーで返ってきたときの処理はここに記述する
                            });
                        alert("削除できました");
                    })
                    .catch(function(err) {
                        // レスポンスがエラーで返ってきたときの処理はここに記述する
                        alert(err);
                    });
            }
        }
    },
});
