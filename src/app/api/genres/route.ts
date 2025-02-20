import { fetchGenres } from "@/api/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  if (type !== "movie" && type !== "tv")
    return NextResponse.json(
      { error: "Bad type parameter" },
      { status: 400 }
    );

  try {
    const data = await fetchGenres(type);
    if (!data)
      return NextResponse.json({ error: "No results found" }, { status: 404 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" + error },
      { status: 500 }
    );
  }
}