import { getToken } from "@/api/token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const REQUEST_TOKEN = await getToken();
    const redirectParam = 'http://localhost:3000/callback';
    const redirectUrl = `https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=${redirectParam}`;
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}