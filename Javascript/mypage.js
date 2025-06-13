document.addEventListener("DOMContentLoaded", function () {
    const credentials = getCookie("credentials");
    if (credentials) {
        const { id, pw } = JSON.parse(credentials);
        getUserData(id, pw)
        return;
    }
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
        document.getElementById("input-username").value = rememberedUsername;
        document.getElementById("remember").checked = true;
    }
    getUserData();
});

function getUserData(id, pw) {
    const api = "http://138.2.120.185/WebProgramming/userdata.php"

    const loginForm = document.querySelector("form");
    loginForm.method = "post";
    loginForm.action = api;
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!id || !pw) {
            id = document.getElementById("input-username").value.trim();
            pw = document.getElementById("input-password").value.trim();
        }
        const remember = document.getElementById("remember").checked;

        if (!username || !password) {
            alert("아이디/비밀번호를 모두 입력하세요.");
            return;
        }

        fetch(api,
            {
                method: "POST",
                body: {
                    "id": id,
                    "password": pw,
                }
            })
            .then((response) => {
                console.log(response.status);
                if (response.status == 200) {
                    writeItems(response.json());
                    if(remember)
                    {
                        localStorage.setrItem("rememberedUsername", username);
                        document.cooke = `id=${id}, pw=${pw}; path=/`
                    }
                }
                else if (response.status == 401) {
                    alert("비밀번호를 확인해주세요.");
                }
                else if (response.status == 404) {
                    alert("사용자 정보가 없습니다.");
                }
            });
    });
}

function writeItems(result) {
    const content = document.getElementById("page-content");

    content.innerHTML = result;
}