import { Artist, Release, ReleaseDetail, Track } from '@/types/types';
import axios from 'axios';

// Функция для получения токена доступа
async function getAccessToken(): Promise<string | null> {
  let token = sessionStorage.getItem('token');
  let expirationDate = sessionStorage.getItem('expirationDate');

  // Проверяем, есть ли токен и не истек ли его срок действия
  if (!token || isExpired(expirationDate)) {
    console.log('Getting token from server');
    try {
      // Запрашиваем токен у сервера
      const tokenResponse = await axios.get('https://expressserver-0u05.onrender.com/token');
      const tokenObj = tokenResponse.data;
      token = tokenObj.access_token;
      updateTokenInSession(tokenObj);
    } catch (error) {
      console.error('Failed to get token from server:', error);
    }
  }

  return token;
}

// Функция для проверки истечения срока действия токена
function isExpired(expirationDate: string | null): boolean {
  return expirationDate ? new Date().getTime() - parseInt(expirationDate) > 0 : true;
}

// Функция для обновления токена в sessionStorage
function updateTokenInSession(tokenObj: any): void {
  const expireTime = new Date();
  expireTime.setTime(expireTime.getTime() + tokenObj.expires_in);
  sessionStorage.setItem('expirationDate', expireTime.getTime().toString());
  sessionStorage.setItem('token', tokenObj.access_token);
}

// Функция для получения данных с API Beatport
export async function getDataFromApi(url: string): Promise<any> {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data from API:', error);
    throw new Error('Failed to fetch data from API');
  }
}

export async function getReleases(labelId: number, page: number): Promise<Release[]> {
  const url = `https://api.beatport.com/v4/catalog/labels/${labelId}/releases?page=${page}`;
  const data = await getDataFromApi(url);
  return data.results;
}

export async function getArtistDetails(artistId: number): Promise<Artist> {
  const url = `https://api.beatport.com/v4/catalog/artists/${artistId}`;
  const data = await getDataFromApi(url);
  return {
    id: data.id,
    name: data.name,
    biography: data.bio,
    image: data.image,
    slug: data.slug,
    url: data.url,
  };
}

export async function getReleaseDetails(releaseId: number): Promise<ReleaseDetail> {
  const url = `https://api.beatport.com/v4/catalog/releases/${releaseId}/`;
  const data = await getDataFromApi(url);
  return data;
}

export async function getTrackId(trackId: number): Promise<Track> {
  const url = `https://api.beatport.com/v4/catalog/tracks/${trackId}/`;
  const data = await getDataFromApi(url);
  return data;
}