import {
  Credits,
  Episode,
  Language,
  LanguageOption,
  Movie,
  SearchOptions,
  SearchResults,
  SeasonDetails,
  TvSeries,
  TypeOfList,
  Videos,
} from "@/lib/definitions";
import { optionsGET } from "./options";

// searching

export async function fetchMulti(
  query: string,
  searchOptions: SearchOptions<'movie' | 'tv'> = {},
  language: LanguageOption = "en-US"
): Promise<SearchResults | undefined> {
  try {
    const defaultOptions = {
      include_adult: false,
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
      query,
      language,
    });

    const url = `https://api.themoviedb.org/3/search/multi?${queryParams.toString()}`;

    const response = await fetch(url, {
      ...optionsGET,
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || data.results.length === 0) {
      return undefined;
    }

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
  language: LanguageOption = "en-US"
): Promise<
  | (T extends "tv"
      ? TvSeries[]
      : T extends "movie"
        ? Movie[]
        : TvSeries[] & Movie[])
  | undefined
> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time}?language=${language}`,
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

// movies and tv series

export async function fetchDiscover<T extends TypeOfList>(
  type: T,
  searchOptions: SearchOptions<T>,
  language: LanguageOption = "en-US"
): Promise<(T extends "tv" ? TvSeries[] : Movie[]) | undefined> {
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
      {
        ...optionsGET,
        next: {
          revalidate: 60,
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
    console.error(e);
    return undefined;
  }
}

// season

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

export async function fetchSeasonCredits(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = "en-US"
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/credits?language=${language}}`,
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

export async function fetchSeasonVideos(
  seriesId: number,
  seasonNr: number,
  language: LanguageOption = "en-US"
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/videos?language=${language}}`,
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

// espisode

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

export async function fetchEpisodeCredits(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = "en-US"
): Promise<Credits | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}/credits?language=${language}}`,
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

export async function fetchEpisodeVideos(
  seriesId: number,
  seasonNr: number,
  episodeNr: number,
  language: LanguageOption = "en-US"
): Promise<Videos | undefined> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNr}/episode/${episodeNr}/videos?language=${language}}`,
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

// others

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
