Vue.component("common-menu", {
    props: ["current"],
    template: `
    <div class="ui secondary pointing green inverted massive menu">
        <a class="item" href="./input.html" v-bind:class="{active: current=='input'}">
            入力
        </a>
        <a class="item" href="./data.html" v-bind:class="{active: current=='data'}">
            データ
        </a>
        <a class="item" href="./advice.html" v-bind:class="{active: current=='advice'}">
            アドバイス
        </a>
        <div class="right menu">
            <button class="item" v-on:click="settings">
                設定
            </button>
            <button class="item" v-on:click="logout">ログアウト</button>
            <button class="item" v-on:click="deleteUser">退会</button>
        </div>
    </div>`,
    methods: {
        settings: function() {
            location.href = "./settings.html";
        },
        logout: function () {
            if (confirm("ログアウトしますか？")) {
                localStorage.removeItem('token');
                location.href = "./login.html";
            }
        },
        deleteUser: function() {
            if (confirm("本当に退会しますか？")) {
                fetch(url + "/user", {
                    method: "DELETE",
                    headers:new Headers({
                        "Authorization": localStorage.getItem('token')
                    }),
                    body: JSON.stringify({
                        "userId": localStorage.getItem('userId')
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
        }
    },

});
