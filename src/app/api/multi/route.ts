import { fetchMulti } from "@/api/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  if (!query)
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );

  try {
    const data = await fetchMulti(query);
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
