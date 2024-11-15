import { TypeOfList } from "@/lib/definitions";
import { optionsGET } from "./options";

export async function fetchMovies(typeOfList: TypeOfList) {
  try {
    // const x = await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${typeOfList}?language=en-US&page=1`,
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
    
    if (data.length) 
      throw new Error("No available data");

    return data.results;
  } catch (e) {
    console.error("Error: " + e);
  }
}
