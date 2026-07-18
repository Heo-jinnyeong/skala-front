const params = new URLSearchParams(window.location.search);

const nameValue = params.get("userName") || "입력 정보 없음";
const idValue = params.get("userId") || "입력 정보 없음";
const emailValue = params.get("userEmail") || "입력 정보 없음";
const pathValue = params.get("joinPath") || "선택 안 함";
const interests = params.getAll("interest");

setText("result-name", nameValue);
setText("result-id", idValue);
setText("result-email", emailValue);
setText("result-path", pathValue);
setText("result-interest", interests.length ? interests.join(", ") : "선택 안 함");

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}
