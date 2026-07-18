const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");

citySelect.addEventListener("change", async function (event) {
    const selectedValue = event.target.value;

    if (selectedValue === "none") {
        weatherBox.innerHTML = "<p>도시를 선택하면 좌표와 실시간 날씨가 표시됩니다.</p>";
        return;
    }

    const [lat, lon] = selectedValue.split(",");
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    weatherBox.innerHTML = `
        <div class="weather-result">
            <h4>📍 ${cityName}</h4>
            <p>위도 ${lat} · 경도 ${lon}</p>
            <p>로딩 중… ⏳</p>
        </div>
    `;

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("날씨 서버 응답 오류");
        }

        const data = await response.json();

        weatherBox.innerHTML = `
            <div class="weather-result">
                <h4>🌍 ${cityName}</h4>
                <p>위도 ${lat} · 경도 ${lon}</p>
                <p>🌡️ 기온: ${data.current.temperature_2m}°C</p>
                <p>💧 습도: ${data.current.relative_humidity_2m}%</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        weatherBox.innerHTML = "<p>⚠️ 날씨 정보를 불러오지 못했습니다.</p>";
    }
});
