import Link from "next/link";
import Image from "next/Image";

export default function Movie({ title, id, posterPath, releaseDate }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div>
      <h1>{title}</h1>
      <h2>{releaseDate}</h2>
      <Link href={`/${id}`}>
        <Image
          src={imagePath + posterPath}
          width={800}
          height={800}
          alt={title}
        />
      </Link>
    </div>
  );
}
