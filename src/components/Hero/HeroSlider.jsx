import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598"
];

function HeroSlider() {

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) => (prev + 1) % images.length);

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="absolute inset-0">

      <img
        src={images[current]}
        className="w-full h-full object-cover"
      />

    </div>
  );
}

export default HeroSlider;