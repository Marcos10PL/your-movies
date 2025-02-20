import {
  Credits,
  DiscoverResults,
  Episode,
  Genre,
  Language,
  LanguageOption,
  Movie,
  SearchOptions,
  SearchResults,
  SeasonDetails,
  TrendingResults,
  TvSeries,
  TypeOfList,
  Videos,
} from "@/lib/definitions";
import { optionsGET } from "./options";

const defaultLanguage: LanguageOption = "en-US";

// searching

export async function fetchMulti(
  query: string,
  searchOptions: SearchOptions<"movie" | "tv"> = {},
  language: LanguageOption = defaultLanguage
): Promise<SearchResults | undefined> {
  try {
    const defaultOptions = {
      include_adult: false,
      page: 1,
    };

    searchOptions = { ...defaultOptions, ...searchOptions };

    const queryParams = new URLSearchParams({
      query,
      ...Object.fromEntries(
        Object.entries(searchOptions).map(([key, value]) => [
          key,
          String(value),
        ])
      ),
      language,
    });

    const url = `https://api.themoviedb.org/3/search/multi?${queryParams.toString()}`;

    const response = await fetch(url, {
      ...optionsGET,
      next: { revalidate: false },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return undefined;
  }
}

// trending

export async function fetchTrending<T extends TypeOfList>(
  type: T | "all",
  time: "day" | "week",
  language: LanguageOption = defaultLanguage
): Promise<TrendingResults<T> | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time}?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// movies and tv series

export async function fetchDiscover<T extends TypeOfList>(
  type: T,
  searchOptions: SearchOptions<T>,
  language: LanguageOption = defaultLanguage
): Promise<DiscoverResults<T> | undefined> {
  try {
    const defaultOptions = {
      include_adult: false,
      "vote_count.gte": 300,
      page: 1,
    };

    searchOptions = { ...defaultOptions, ...searchOptions };

    const queryParams = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(searchOptions).map(([key, value]) => [
          key,
          String(value),
        ])
      ),
      language,
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?${queryParams.toString()}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function findById<T extends TypeOfList>(
  type: T,
  id: number,
  language: LanguageOption = defaultLanguage
): Promise<(T extends "tv" ? TvSeries : Movie) | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchCredits<T extends TypeOfList>(
  type: T,
  id: number,
  language: LanguageOption = defaultLanguage
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchVideos<T extends TypeOfList>(
  type: T,
  id: number,
  language: LanguageOption = defaultLanguage
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// season

export async function fetchSeasonDetails(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = defaultLanguage
): Promise<SeasonDetails | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchSeasonCredits(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = defaultLanguage
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/credits?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchSeasonVideos(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = defaultLanguage
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/videos?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// espisode

export async function fetchEpisodeDetails(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = defaultLanguage
): Promise<Episode | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchEpisodeCredits(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = defaultLanguage
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}/credits?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchEpisodeVideos(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = defaultLanguage
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}/videos?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// others

export async function fetchLanguages(): Promise<Language[] | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function fetchGenres<T extends TypeOfList>(
  type: T,
  language: LanguageOption = defaultLanguage
): Promise<Genre[] | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=${language}`,
      optionsGET
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
