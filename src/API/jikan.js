// src/api/apiJikan.js

const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Attend pendant un certain nombre de millisecondes.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fait un appel fetch avec tentative de repli en cas d'erreur 429 (Too Many Requests).
 */
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

/**
 * Récupère les animes populaires.
 */
export async function getPopularAnimes(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/top/anime?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des animes populaires :', error);
    return [];
  }
}

/**
 * Récupère les animes à venir (upcoming).
 */
export async function getUpcomingAnimes(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/seasons/upcoming?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des animes à venir :', error);
    return [];
  }
}

/**
 * Récupère les animes actuellement diffusés cette saison.
 */
export async function getCurrentSeasonAnimes(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/seasons/now?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des animes actuels :', error);
    return [];
  }
}

/**
 * Récupère les personnages les plus populaires.
 */
export async function getPopularCharacters(limit = 10) {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/top/characters?limit=${limit}`);
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des personnages populaires :', error);
    return [];
  }
}
