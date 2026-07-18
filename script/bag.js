function showMyBag() {
    var myBag = [
        { name: "노트북", count: 1, purpose: "강의 실습과 코드 작성" },
        { name: "충전기", count: 1, purpose: "노트북과 스마트폰 충전" },
        { name: "노트와 펜", count: 1, purpose: "아이디어와 오류 원인 기록" },
        { name: "이어폰", count: 1, purpose: "강의 영상과 음악 감상" },
        { name: "물병", count: 1, purpose: "수분 보충" }
    ];

    var result = "🎒 내 가방 속 물품\n";
    result += "--------------------------\n";

    for (var i = 0; i < myBag.length; i++) {
        var item = myBag[i];
        result += (i + 1) + ". " + item.name + " " + item.count + "개\n";
        result += "   - " + item.purpose + "\n";
    }

    result += "--------------------------\n";
    result += "총 " + myBag.length + "종류의 물품이 있습니다.";

    alert(result);
}

window.showMyBag = showMyBag;
