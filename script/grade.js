function checkGrade() {
    var subjects = ["HTML", "CSS", "JavaScript"];
    var total = 0;

    for (var i = 0; i < subjects.length; i++) {
        var input = prompt(subjects[i] + " 점수를 입력하세요. (0~100)");

        if (input === null) {
            alert("성적 계산을 취소했습니다.");
            return;
        }

        var score = Number(input);

        if (!Number.isFinite(score) || score < 0 || score > 100) {
            alert("0부터 100 사이의 숫자를 입력해 주세요.");
            i -= 1;
            continue;
        }

        total += score;
    }

    var average = total / subjects.length;
    var pass = average >= 60 ? "합격" : "불합격";
    var grade = "F";

    if (average >= 90) {
        grade = "A";
    } else if (average >= 80) {
        grade = "B";
    } else if (average >= 70) {
        grade = "C";
    } else if (average >= 60) {
        grade = "D";
    }

    alert(
        "📊 성적 계산 결과\n" +
        "--------------------\n" +
        "총점: " + total.toFixed(1) + "점\n" +
        "평균: " + average.toFixed(1) + "점\n" +
        "등급: " + grade + "\n" +
        "결과: " + pass + "입니다!"
    );
}

window.checkGrade = checkGrade;
