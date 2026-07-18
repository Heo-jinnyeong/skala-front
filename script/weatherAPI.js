const WEATHER_CODE_TEXT = {
    0: "맑음",
    1: "대체로 맑음",
    2: "부분적으로 흐림",
    3: "흐림",
    45: "안개",
    48: "서리 안개",
    51: "약한 이슬비",
    53: "이슬비",
    55: "강한 이슬비",
    61: "약한 비",
    63: "비",
    65: "강한 비",
    71: "약한 눈",
    73: "눈",
    75: "강한 눈",
    80: "약한 소나기",
    81: "소나기",
    82: "강한 소나기",
    95: "뇌우"
};

export async function getLiveWeather(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "weather_code",
            "wind_speed_10m"
        ].join(","),
        timezone: "auto"
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

    if (!response.ok) {
        throw new Error(`Open-Meteo 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    return {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        apparentTemperature: current.apparent_temperature,
        windSpeed: current.wind_speed_10m,
        weatherText: WEATHER_CODE_TEXT[current.weather_code] || "날씨 정보",
        timezone: data.timezone
    };
}
