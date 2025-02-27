const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export const optionsGET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
  next: {
    revalidate: 24 * 60 * 60,
  },
};