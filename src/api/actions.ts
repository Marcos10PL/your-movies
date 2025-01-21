import {
  LanguageOption,
  Movie,
  SearchOptions,
  TvSeries,
  TypeOfList,
} from "@/lib/definitions";
import { optionsGET } from "./options";

export async function fetchData<T extends TypeOfList>(
  type: T,
  searchOptions: SearchOptions<T>,
  language: LanguageOption = "en-US"
): Promise<Movie[] | TvSeries[] | undefined> {
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
) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=${language}}`,
      {
        ...optionsGET,
        cache: "no-store",
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
  }
}

export async function fetchCast<T extends TypeOfList>(
  type: T,
  id: number,
  language: LanguageOption = "en-US"
) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=${language}}`,
      {
        ...optionsGET,
        cache: "no-store",
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
  }
}
