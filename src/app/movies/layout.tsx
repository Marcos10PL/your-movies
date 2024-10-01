export default function MoviesLayout({
  children,
  nowPlayingMovies,
  tenMostPopular
}: {
  children: React.ReactNode;
  nowPlayingMovies: React.ReactNode;
  tenMostPopular: React.ReactNode;
}) {
  return(
    <>
      {children}
      {tenMostPopular}
      {nowPlayingMovies}
    </>
  )
}