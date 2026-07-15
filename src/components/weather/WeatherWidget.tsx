import { useEffect, useState } from 'react';

interface WeatherData {
  temp: number;
  description: string;
  isDay: boolean;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDaytime, setIsDaytime] = useState(true);

  // 1. Verifica se é dia ou noite baseado na hora local para definir o emoji Sol/Lua
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDaytime(hour >= 6 && hour < 18);
  }, []);

  // 2. Busca o clima via API de Geolocalização do Navegador + Open-Meteo API
  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // API gratuita que não exige API Key
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const data = await response.json();

          if (data.current_weather) {
            setWeather({
              temp: Math.round(data.current_weather.temperature),
              description: getWeatherDescription(data.current_weather.weathercode),
              isDay: data.current_weather.is_day === 1,
            });
          }
        } catch (error) {
          console.error("Erro ao buscar dados de clima:", error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        // Fallback caso o usuário negue a localização (Ex: São Paulo como padrão)
        fetchFallbackWeather();
      }
    );
  }, []);

  async function fetchFallbackWeather() {
    try {
      // Coordenadas de São Paulo como fallback padrão
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=-23.5489&longitude=-46.6388&current_weather=true`
      );
      const data = await response.json();
      if (data.current_weather) {
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          description: getWeatherDescription(data.current_weather.weathercode),
          isDay: data.current_weather.is_day === 1,
        });
      }
    } catch {
      // Silencia erros de fallback
    } finally {
      setLoading(false);
    }
  }

  // Helper para traduzir os códigos da API Open-Meteo
  function getWeatherDescription(code: number): string {
    if (code === 0) return 'Céu Limpo';
    if (code <= 3) return 'Parcialmente Nublado';
    if (code <= 48) return 'Nevoeiro';
    if (code <= 67) return 'Chuva Leve';
    if (code <= 82) return 'Chuva Forte';
    if (code <= 99) return 'Tempestade';
    return 'Instável';
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-xs text-slate-400 animate-pulse bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
        <span>🔄 Carregando clima...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full transition-colors shadow-sm">
      {/* Emoji dinâmico baseado no Horário Local: ☀️ de dia, 🌙 de noite */}
      <span className="text-base select-none" title={isDaytime ? "Dia" : "Noite"}>
        {isDaytime ? '☀️' : '🌙'}
      </span>
      
      {weather && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
          <span className="font-bold text-white">{weather.temp}°C</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-400">{weather.description}</span>
        </div>
      )}
    </div>
  );
}