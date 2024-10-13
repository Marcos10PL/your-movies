import { optionsGET } from "./options";

export async function getToken() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new",
      {
        ...optionsGET,
        headers: {
          ...optionsGET.headers,
          'Cache-Control': 'no-store',
        },
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );

    const data = await response.json();

    if (!data.success) throw new Error("Failed to get request token");

    return data.request_token;
  } catch (e: any) {
    console.log("Error in getToken:", e.message || e);
    throw new Error("Unknown error occurred while fetching token");
  }
}
