"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenAndRedirect = async () => {
      try {
        const response = await fetch("/api/login"); // Zmieniamy na poprawny endpoint
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "An unknown error occurred.");
          return;
        }

        const tokenData = await response.json();
        const redirectUrl = `https://www.themoviedb.org/authenticate/${tokenData.request_token}`;
        window.location.href = redirectUrl; // Przekierowanie do TMDB
      } catch (e) {
        setError("Failed to fetch token.");
      }
    };

    fetchTokenAndRedirect();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Logowanie do TMDB w toku...</p>
    </div>
  );
}
