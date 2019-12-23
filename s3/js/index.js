var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    created: function() {
        // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
        location.href = "./login.html";
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
    },
});
