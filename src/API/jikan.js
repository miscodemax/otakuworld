const BASE_URL = 'https://api.jikan.moe/v4';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        if (attempt < retries) {
          console.warn(`429 reçu. Tentative ${attempt + 1}/${retries}. Attente ${delayMs * (attempt + 1)} ms...`);
          await delay(delayMs * (attempt + 1));
          continue;
        } else {
          throw new Error('Trop de requêtes (429), échec après plusieurs tentatives.');
        }
      }

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === retries) throw error;
      await delay(delayMs * (attempt + 1));
    }
  }
}

export async function getPopularAnimes(limit = 10, page = 2, type='anime') {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/top/${type}?limit=${limit}&page=${page}`);
    console.log("Données retournées par l'API :", data);
    return [data.data, data.pagination];
  } catch (error) {
    console.error('Erreur lors du chargement des animes populaires :', error);
    return [];
  }
}

// Exemple : /top/people
export async function getPopularMangakas(limit = 25, page = 1) {
  const res = await fetch(`https://api.jikan.moe/v4/top/people?page=${page}&limit=${limit}`);
  const data = await res.json();
  return data.data;
}



export async function getUpcomingAnimes(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/seasons/upcoming?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des animes à venir :', error);
    return [];
  }
}

export async function getCurrentSeasonAnimes(limit = 10, page = 2) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/seasons/now?limit=${limit}&page=${page}`);
    return [data.data, data.pagination];
  } catch (error) {
    console.error('Erreur lors du chargement des animes actuels :', error);
    return [];
  }
}

export async function getGenre(limit = 10, page = 1, genre = 1, choice, type='anime') {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/${type}?limit=${limit}&page=${page}&${choice}=${genre}&&order_by=popularity&sort=asc`);
    return [data.data, data.pagination];
  } catch (error) {
    console.error('Erreur lors du chargement des animes par genre :', error);
    return [];
  }
}
export async function getSuggestionAnime() {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/top/anime?limit=25`);
    return [data.data, data.pagination];
  } catch (error) {
    console.error('Erreur lors du chargement des animes par genre :', error);
    return [];
  }
}

export async function getPopularCharacters(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/top/characters?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des personnages populaires :', error);
    return [];
  }
}

export async function getSeiyus(limit = 10, allSeiyuspercharacter = 2) {
  try {
    const characters = await getPopularCharacters(limit);
    const allSeiyus = [];

    for (const character of characters) {
      const response = await fetchWithRetry(`${BASE_URL}/characters/${character.mal_id}/full`);
      const data = response.data;

      if (data && data.voices && Array.isArray(data.voices)) {
        data.voices.slice(0, allSeiyuspercharacter).forEach(voice => {
          if (voice.person) {
            allSeiyus.push({
              personnage: character.name,
              language: voice.language,
              mal_id: voice.person.mal_id,
              name: voice.person.name,
              images: voice.person.images,
              langue: voice.language,
              favorite: character.favorites,
            });
          }
        });
      }
    }

    return allSeiyus;
  } catch (err) {
    console.error("Erreur lors du chargement des seiyuus :", err);
    return [];
  }
}

export async function getStudioAnimes(studioId, limit = 5) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/anime?producers=${studioId}&limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error(`Erreur lors du chargement des animes du studio ${studioId} :`, error);
    return [];
  }
}

export async function getNewsFromStudioAnimes(studioId, animeLimit = 5, newsLimitPerAnime = 2) {
  try {
    const animes = await getStudioAnimes(studioId, animeLimit);
    const allNews = [];

    for (const anime of animes) {
      const newsData = await fetchWithRetry(`${BASE_URL}/anime/${anime.mal_id}/news`);
      const newsItems = (newsData.data || []).slice(0, newsLimitPerAnime).map(news => ({
        title: news.title,
        url: news.url,
        image: news.images?.jpg?.image_url || anime.images?.jpg?.image_url,
        excerpt: news.excerpt,
        date: news.date,
        animeTitle: anime.title
      }));
      allNews.push(...newsItems);
    }

    return allNews;
  } catch (error) {
    console.error(`Erreur lors du chargement des news pour le studio ${studioId} :`, error);
    return [];
  }
}

export async function getShonen(limit = 10, page = 2, type='anime') {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/${type}?order_by=popularity&sort=asc&genres=27&genre_type=demographics&limit=${limit}&page=${page}`
    );
    return [data.data, data.pagination];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getShojo(limit = 10, page = 2, type='anime') {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/${type}?order_by=popularity&sort=asc&genres=25&genre_type=demographics&limit=${limit}&page=${page}`
    );
    return [data.data, data.pagination];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSeinen(limit = 10, page = 2, type='anime') {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/${type}?genres=42&genre_type=demographics&limit=${limit}&page=${page}&order_by=popularity&sort=asc`
    );
    return [data.data, data.pagination];
  } catch (error) {
    console.log(error);
    return [];
  }
}
