document.addEventListener("DOMContentLoaded", function () {
    const credential = getCredentials();
    if (credential) {
        ({id, pw} = credential);
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

//참고: https://ko.javascript.info/cookie
function getCredentials() {
    const id = document.cookie.match(/(?:^|; )id=([^;]*)/); //찾으려는 쿠키가 중간에 있더라도 검증
    const pw = document.cookie.match(/(?:^|; )pw=([^;]*)/);
    return (id && pw) ? {
        id: decodeURIComponent(id[1]),
        pw: decodeURIComponent(pw[1])
    } : undefined;
}

function getUserData(id, pw) {
    const api = "http://138.2.120.185/WebProgrammingProject/userdata.php"

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

        fetch(api,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: new URLSearchParams({ id: id, password: pw })
            })
            .then((response) => {
                console.log(response.status);
                if (response.ok) {
                    loginForm.hidden = true;
                    writeItems(response.json());
                    if (remember) {
                        localStorage.setrItem("rememberedUsername", username);
                        document.cooke = `id=${encodeURIComponent(id)}, pw=${encodeURIComponent(pw)}; path=/`
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
    const container = document.getElementById("result-container");
    container.hidden = false;
    const content = document.getElementById("result");
    result.result.forEach(r => {
        content.innerHTML += `<div>${r}</div>`;
    });
}