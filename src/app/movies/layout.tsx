export default function MoviesLayout({
  children,
  nowPlaying,
  mostPopular,
  upcoming
}: {
  children: React.ReactNode;
  nowPlaying: React.ReactNode;
  mostPopular: React.ReactNode;
  upcoming: React.ReactNode;
}) {
  return(
    <>
      {children}
      {mostPopular}
      {upcoming}
      {nowPlaying}
    </>
  )
}