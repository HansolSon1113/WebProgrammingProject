const api = "http://138.2.120.185/WebProgrammingProject/"

document.addEventListener("DOMContentLoaded", function () {
    const credential = getCredentials();
    if (credential) {
        ({ id, pw } = credential);
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
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!id || !pw) {
            id = document.getElementById("input-username").value.trim();
            pw = document.getElementById("input-password").value.trim();
        }
        const remember = document.getElementById("remember").checked;

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
                        if (remember) {
                            localStorage.setItem("rememberedUsername", id);
                            document.cookie = `id=${encodeURIComponent(id)}; pw=${encodeURIComponent(pw)}; path=/`;
                        }
                    });
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
    document.getElementById("page").hidden = true;

    const products = await getProductData();
    if (!products) return;

    console.log(products);

    const container = document.getElementById("result-container");
    container.hidden = false;
    const content = document.getElementById("result");
    items.forEach(item => {
        const product = products[item]
        content.innerHTML += `<div class="result-row">
                <img src="${product.img}" alt=${product.name + " 사진"}>
                <h2>${product.name}</h2>
                <p>${product.price}</p>
            </div>`;
    });
}