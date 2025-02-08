import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const apiKey = process.env.TMDB_API_KEY;

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&page=1&language=en-US&api_key=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from TMDB" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from TMDB:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
