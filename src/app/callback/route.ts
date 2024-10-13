import { optionsPOST } from "@/api/options";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const requestToken = url.searchParams.get("request_token");

    if (!requestToken) {
      return NextResponse.json({ error: 'No request token provided' }, { status: 400 });
    }

    // Uzyskaj session ID
    const sessionResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, 
    {
      ...optionsPOST,
      body: JSON.stringify({ request_token: requestToken }),
    });

    if (!sessionResponse.ok) {
      throw new Error('Failed to create session');
    }

    const sessionData = await sessionResponse.json();
    const sessionId = sessionData.session_id;

    console.log('Session ID:', sessionData.session_id);

    const response = NextResponse.json({ message: 'Session created successfully' });

    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60,
      sameSite: 'strict', 
    });
    // return NextResponse.json({ session_id: sessionData.session_id }, { status: 200 });

    // Na przykład, przekieruj użytkownika do strony głównej po utworzeniu sesji
    return NextResponse.redirect('http://localhost:3000/'); // Przekierowanie po zalogowaniu
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}