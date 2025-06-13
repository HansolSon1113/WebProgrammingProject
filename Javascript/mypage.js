document.addEventListener("DOMContentLoaded", function () {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
        document.getElementById("input-username").value = rememberedUsername;
        document.getElementById("remember").checked = true;
    }

    getUserData();
});

function getUserData() {
    const api = "http://138.2.120.185/WebProgramming/userdata.php"

    const loginForm = document.querySelector("form");
    loginForm.method = "post";
    loginForm.action = api;
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("input-username").value.trim();
        const password = document.getElementById("input-password").value.trim();
        const remember = document.getElementById("remember").checked;

        if (!username || !password) {
            alert("아이디/비밀번호를 모두 입력하세요.");
            return;
        }

        fetch(api,
            {
                method: "POST",
                body: {
                    "id": username.value,
                    "password": password.value,
                }
            })
            .then((response) => {
                console.log(response.status);
                if(response.status == 404)
                {
                    alert("구매 정보가 없습니다.");
                }
            });
    });
}