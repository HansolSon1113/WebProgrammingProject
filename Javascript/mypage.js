const api = "http://138.2.120.185/WebProgrammingProject/"

document.addEventListener("DOMContentLoaded", function () {
    const credential = getCredentials();
    if (credential) {
        const { id, pw } = credential;
        getUserData(id, pw);
        return;
    }

    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
        document.getElementById("input-username").value = rememberedUsername;
        document.getElementById("remember").checked = true;
    }

    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (event) {
        const id = document.getElementById("input-username").value.trim();
        const pw = document.getElementById("input-password").value.trim();
        event.preventDefault();
        getUserData(id, pw);
    });
});

function getCredentials() {
    const id = document.cookie.match(/(?<=^|;\s*)id=([^;]*)/); // id 값만 정확히 추출
    const pw = document.cookie.match(/(?<=^|;\s*)pw=([^;]*)/);

    return (id && pw) ? {
        id: decodeURIComponent(id[1]),
        pw: decodeURIComponent(pw[1])
    } : undefined;
}

function getUserData(id, pw) {
    const remember = document.getElementById("remember").checked;
    if (remember) {
        localStorage.setItem("rememberedUsername", id);
    }
    else {
        localStorage.clear();
    }

    fetch(api + "userdata.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams({ id: id, password: pw })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    writeItems(data);
                    document.cookie = `id=${encodeURIComponent(id)}; path=/`;
                    document.cookie = `pw=${encodeURIComponent(pw)}; path=/`
                });
            }
            else if (response.status == 401) {
                alert("비밀번호를 확인해주세요.");
            }
            else if (response.status == 404) {
                alert("사용자 정보가 없습니다.");
            }
        });
}

async function getProductData() {
    const response = await fetch(api + "product.php", {
        method: "GET"
    });
    if (response.ok) {
        return response.json();
    } else {
        alert("상품 정보를 가져올 수 없습니다. 나중에 다시 시도해주세요.");
        return null;
    }
}

async function writeItems(items) {
    document.getElementById("page").style.display = "none";

    const products = await getProductData();
    if (!products) return;

    const container = document.getElementById("result-container");
    container.hidden = false;
    const content = document.getElementById("result");
    if (items.length == 0)
    {
        content.innerHTML += "<h2>구매 기록이 없습니다.</h2>"
    }
    items.forEach(item => {
        const product = products[item - 1];
        content.innerHTML += `
        <hr>
        <div class="result-row">
            <img src="Assets/${product.img}" alt=${product.name + " 사진"}>
            <h2>${product.name}</h2>
            <p>${product.price}원</p>
            <div><p>배송/수령</p><p>대기중</p></div>
            <div class="result-buttons">
                <a href="detail.html?id=${item}" target="_blank">상세보기</a>
            </div>
        </div>`;

        document.getElementById("logout").addEventListener("click", () => {
            document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
            document.cookie = "pw=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
            location.reload();
        });
    });
}