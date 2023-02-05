import Movie from "./Movie";

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return (
    <main>
      <div className="grid gap-16 grid-cols-fluid">
        {res.results.map(({ id, title, poster_path, release_date }) => (
          <Movie
            key={id}
            id={id}
            title={title}
            posterPath={poster_path}
            releaseDate={release_date}
          />
        ))}
      </div>
    </main>
  );
}
