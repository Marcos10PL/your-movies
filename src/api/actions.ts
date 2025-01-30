import {
  Credits,
  Episode,
  Language,
  LanguageOption,
  Movie,
  SearchOptions,
  SeasonDetails,
  TvSeries,
  TypeOfList,
  Videos,
} from "@/lib/definitions";
import { optionsGET } from "./options";

export async function fetchData<T extends TypeOfList>(
  type: T,
  searchOptions: SearchOptions<T>,
  language: LanguageOption = "en-US"
): Promise<(T extends "tv" ? TvSeries : Movie) | undefined> {
  try {
    searchOptions = {
      include_adult: false,
      "vote_count.gte": 300,
      page: 1,
      ...searchOptions,
    };

    const queryParams = new URLSearchParams();

    Object.entries(searchOptions).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?${language}&${queryParams.toString()}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No available data");
    }
    return data.results;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function findById<T extends TypeOfList>(
  type: T,
  id: number,
  language: LanguageOption = "en-US"
): Promise<(T extends "tv" ? TvSeries : Movie) | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=${language}}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
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
  language: LanguageOption = "en-US"
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=${language}}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
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
  language: LanguageOption = "en-US"
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=${language}}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data) throw new Error("No available data");

    return data;
  } catch (e) {
    // console.error(e);
    return undefined;
  }
}

export async function fetchLanguages(): Promise<Language[] | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
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

export async function fetchSeasonDetails(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = "en-US"
): Promise<SeasonDetails | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}?language=${language}}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
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

export async function fetchEpisodeDetails(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = "en-US"
): Promise<Episode | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}?language=${language}}`,
      {
        ...optionsGET,
        next: {
          revalidate: 24 * 60 * 60,
        },
      }
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
