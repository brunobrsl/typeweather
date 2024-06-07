import { api } from "./api";

export interface CityProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CityAPIResponse {
  id: string;
  name: string;
  sys: {
    country?: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export async function getCityByNameService(name: string): Promise<CityProps[]> {
  try {
    const { data } = await api.get<CityAPIResponse>(`/weather?q=${name}`);

    const city = {
      id: data.id,
      name: data.sys.country ? `${data.name}, ${data.sys.country}` : data.name,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    };

    return [city];
  } catch (error) {
    return [];
  }
}