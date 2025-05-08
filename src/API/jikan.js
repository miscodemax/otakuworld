// src/api/apiJikan.js

const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Récupère les animes populaires.
 */
export async function getPopularAnimes(limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?limit=${limit}`);
    const data = await response.json();
    return data.data; // contient la liste des animes
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
    const response = await fetch(`${BASE_URL}/seasons/upcoming?limit=${limit}`);
    const data = await response.json();
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
    const response = await fetch(`${BASE_URL}/seasons/now?limit=${limit}`);
    const data = await response.json();
    return data.data;
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
    const response = await fetch(`${BASE_URL}/top/characters?limit=${limit}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Erreur lors du chargement des personnages populaires :', error);
    return [];
  }
}
