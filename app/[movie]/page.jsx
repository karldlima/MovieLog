import Image from "next/image";

/* this function will ensure server side rendering of these movie detail pages,
 * which will save a network call for each movie detail page
 */
export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res.results.map((movie) => ({
    movie: toString(movie.id),
  }));
}

/* if using Axios or Prisma and want to revalidate, you can apply the following:
 * const export revalidate = 60
 */

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  /* could add a { next: { revalidate: 60 } } object as a 2nd
   param to fetch to refetch and rerender every minute */
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime}</h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          priority //paints quickly
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
