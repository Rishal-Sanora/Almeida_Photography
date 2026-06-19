import { Link } from "react-router-dom";

function PortfolioCategoryCard({
  title,
  image,
  route
}) {

  return (

    <Link
      to={route}
      className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(236,72,153,0.15)] group border border-pink-100 block h-36"
    >

      <img
        src={image}
        alt=""
        className="h-full w-full object-cover group-hover:scale-110 duration-500 opacity-90 group-hover:opacity-100"
      />

      <div className="absolute inset-0 bg-white/20 group-hover:bg-pink-100/10 transition-colors duration-500 flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none">

        <h1 className="text-xl text-gray-900 font-bold tracking-widest uppercase bg-white/80 px-4 py-2 rounded-full border border-pink-200">

          {title}

        </h1>

      </div>

    </Link>

  );

}

export default PortfolioCategoryCard;