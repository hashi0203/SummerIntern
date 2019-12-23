var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    methods: {
    // Vue.jsで使う関数はここで記述する
        input: function() {
            location.href = "./input.html";
        },
        data : function() {
            location.href = "./data.html";
        }
    }
});
