import { getLiveWeather } from "./weatherAPI.js";

const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");
const locationButton = document.querySelector("#location-weather-button");

let interactionVersion = 0;
let weatherRequestId = 0;

if (citySelect && weatherBox && locationButton) {
    citySelect.addEventListener("change", handleCityChange);
    locationButton.addEventListener("click", requestCurrentLocation);
    requestCurrentLocation();
}

function requestCurrentLocation() {
    const currentVersion = ++interactionVersion;

    if (!navigator.geolocation) {
        showLocationError("이 브라우저에서는 위치 기능을 지원하지 않습니다.");
        return;
    }

    setLocationLoading(true);
    weatherBox.innerHTML = `
        <div class="weather-result is-loading">
            <h4>📍 현재 위치 확인 중</h4>
            <p>브라우저에 위치 권한을 허용해 주세요.</p>
        </div>
    `;

    navigator.geolocation.getCurrentPosition(
        async function (position) {
            if (currentVersion !== interactionVersion) return;

            const { latitude, longitude, accuracy } = position.coords;
            citySelect.value = "none";

            await loadWeather({
                latitude,
                longitude,
                title: "현재 위치",
                detail: `위도 ${latitude.toFixed(4)} · 경도 ${longitude.toFixed(4)} · 정확도 약 ${Math.round(accuracy)}m`
            });

            if (currentVersion === interactionVersion) setLocationLoading(false);
        },
        function (error) {
            if (currentVersion !== interactionVersion) return;

            const messages = {
                1: "위치 권한이 허용되지 않았습니다. 권한을 허용하거나 아래에서 도시를 선택해 주세요.",
                2: "현재 위치를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.",
                3: "위치 확인 시간이 초과되었습니다. 다시 시도해 주세요."
            };

            showLocationError(messages[error.code] || "위치를 확인하는 중 문제가 발생했습니다.");
            setLocationLoading(false);
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

function handleCityChange(event) {
    interactionVersion += 1;
    setLocationLoading(false);

    const selectedValue = event.target.value;

    if (selectedValue === "none") {
        weatherBox.innerHTML = "<p>현재 위치 버튼을 누르거나 도시를 선택해 주세요.</p>";
        return;
    }

    const [latitude, longitude] = selectedValue.split(",");
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    loadWeather({
        latitude,
        longitude,
        title: cityName,
        detail: `위도 ${latitude} · 경도 ${longitude}`
    });
}

async function loadWeather({ latitude, longitude, title, detail }) {
    const currentRequestId = ++weatherRequestId;

    weatherBox.innerHTML = `
        <div class="weather-result is-loading">
            <h4>📍 ${escapeHtml(title)}</h4>
            <p>${escapeHtml(detail)}</p>
            <p>실시간 날씨를 불러오고 있습니다…</p>
        </div>
    `;

    try {
        const weather = await getLiveWeather(latitude, longitude);
        if (currentRequestId !== weatherRequestId) return;

        weatherBox.innerHTML = `
            <div class="weather-result">
                <div class="weather-location-row">
                    <h4>🌤️ ${escapeHtml(title)}</h4>
                    <span class="live-badge">LIVE</span>
                </div>
                <p>${escapeHtml(detail)}</p>
                <p>${escapeHtml(weather.weatherText)} · ${escapeHtml(weather.timezone)}</p>
                <div class="weather-grid">
                    <div class="weather-stat">
                        <span>현재 기온</span>
                        <strong>${weather.temperature}°C</strong>
                    </div>
                    <div class="weather-stat">
                        <span>습도</span>
                        <strong>${weather.humidity}%</strong>
                    </div>
                    <div class="weather-stat">
                        <span>체감 온도</span>
                        <strong>${weather.apparentTemperature}°C</strong>
                    </div>
                    <div class="weather-stat">
                        <span>풍속</span>
                        <strong>${weather.windSpeed} km/h</strong>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        if (currentRequestId !== weatherRequestId) return;

        weatherBox.innerHTML = `
            <div class="weather-result is-error">
                <h4>⚠️ 날씨 정보를 불러오지 못했습니다.</h4>
                <p>인터넷 연결과 Live Server 실행 여부를 확인해 주세요.</p>
            </div>
        `;
    }
}

function showLocationError(message) {
    weatherBox.innerHTML = `
        <div class="weather-result is-error">
            <h4>위치 기반 날씨를 사용할 수 없습니다.</h4>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function setLocationLoading(isLoading) {
    locationButton.disabled = isLoading;
    locationButton.innerHTML = isLoading
        ? '<span class="location-spinner" aria-hidden="true"></span> 위치 확인 중…'
        : '<span aria-hidden="true">◎</span> 현재 위치 날씨 불러오기';
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
