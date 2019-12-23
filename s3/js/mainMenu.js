var vm = new Vue({
    el: "#app", // Vue.jsを使うタグのIDを指定
    data: {
    // Vue.jsで使う変数はここに記述する
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
            "notification_meal": null,
            "notification_exercise": null,
            "tone": null,
            "goal": null
        }
    },
    methods: {
    // Vue.jsで使う関数はここで記述する
    logout: function () {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
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
    }

});