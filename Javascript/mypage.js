document.addEventListener("DOMContentLoaded", function () {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
        document.getElementById("input-username").value = rememberedUsername;
        document.getElementById("remember").checked = true;
    }

    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("input-username").value.trim();
        const password = document.getElementById("input-password").value.trim();
        const remember = document.getElementById("remember").checked;

        if (!username || !password) {
            alert("아이디/비밀번호를 모두 입력하세요.");
            return;
        }

        if (username === "Username" && password === "Password") {
            if (remember) {
                localStorage.setItem("rememberedUsername", username);
            } else {
                localStorage.removeItem("rememberedUsername");
            }
            alert("로그인 성공!");
            window.location.href = "https://learn.hansung.ac.kr";
        } else {
            alert("아이디/비밀번호 오류");
        }
    });
});