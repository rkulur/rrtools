import { NavLink } from "react-router-dom";
import defaultBg from "../../assets/images/default_card_bg.webp";
import { useRef } from "react";

export type CardProps = {
  imgSrc: string | null;
  title: string;
  path: string;
};

const Card = ({ imgSrc, title, path }: CardProps) => {
  const card = useRef<null | HTMLDivElement>(null);
  const img = useRef<null | HTMLImageElement>(null);

  card.current?.addEventListener("mouseenter", () => {
    img.current?.classList.add("scale-[102%]");
  });

  card.current?.addEventListener("mouseleave", () => {
    img.current?.classList.remove("scale-[102%]");
  });
  return (
    <NavLink to={path}>
      <div
        ref={card}
        className="aspect-square h-60 p-3 rounded-lg border drop-shadow-md hover:drop-shadow-xl bg-gray-50 flex flex-col"
      >
        <div className="h-3/4 w-full bg-white overflow-hidden rounded-lg ">
          <img
            ref={img}
            src={imgSrc === null ? defaultBg : imgSrc}
            className="h-full w-full object-contain transition-transform"
          />
        </div>
        <h1 className="mt-3 font-bold pt-2">{title}</h1>
      </div>
    </NavLink>
  );
};

export default Card;
