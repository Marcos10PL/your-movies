import { optionsGET } from "./options";

export async function fetchNowPlayingMovies() {
  try {
    // const x = await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();
    return data.results;
  } catch (e) {
    console.error(e);
    throw new Error("Uknown error");
  }
}

export async function fetchTenMostPopular() {
  try {
    // const x = await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (e) {
    console.error(e);
    throw new Error("Uknown error");
  }
}
