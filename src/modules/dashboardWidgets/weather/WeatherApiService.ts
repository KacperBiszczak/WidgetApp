// import type { WeatherApiResponse, WeatherData } from "./WeatherApiTypes";

export class WeatherApiService {
    private readonly baseUrl = "https://api.weatherapi.com/v1";
    private readonly apiKey = "ec86249c9b804691be9135258241307";

    async getCurrentWeather(city: string) {
        const url = new URL(`${this.baseUrl}/current.json`);

        url.searchParams.set("key", this.apiKey);
        url.searchParams.set("q", city);
        url.searchParams.set("lang", "pl");
        url.searchParams.set("aqi", "no");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Nie udało się pobrać pogody.");
        }

        const data = await response.json();

        return {
            city: data.location.name,
            country: data.location.country,
            temperature: data.current.temp_c,
            feelsLike: data.current.feelslike_c,
            humidity: data.current.humidity,
            windKph: data.current.wind_kph,
            description: data.current.condition.text,
            iconUrl: `https:${data.current.condition.icon}`,
        };
    }
}