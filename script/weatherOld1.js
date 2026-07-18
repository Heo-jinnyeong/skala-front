const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");

citySelect.addEventListener("change", function (event) {
    const selectedValue = event.target.value;

    if (selectedValue === "none") {
        weatherBox.innerHTML = "<p>도시를 선택하면 좌표가 표시됩니다.</p>";
        return;
    }

    const [lat, lon] = selectedValue.split(",");
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    weatherBox.innerHTML = `
        <div class="weather-result">
            <h4>📍 ${cityName}</h4>
            <p>위도: ${lat}</p>
            <p>경도: ${lon}</p>
        </div>
    `;
});
