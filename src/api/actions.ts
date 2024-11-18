import { LanguageOption, SearchOptions, TypeOfList } from "@/lib/definitions";
import { optionsGET } from "./options";

export async function fetchData<T extends TypeOfList>(
  type: T,
  searchOptions: SearchOptions<T>,
  language: LanguageOption = "en-US"
) {
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
        cache: "no-store",
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (data.length) throw new Error("No available data");

    return data.results;
  } catch (e) {
    console.error(e);
  }
}
