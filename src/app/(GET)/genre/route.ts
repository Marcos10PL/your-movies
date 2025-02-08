import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const apiKey = process.env.TMDB_API_KEY;

  if (!type) {
    return NextResponse.json(
      { error: "Type parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en&api_key=${apiKey}`
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
