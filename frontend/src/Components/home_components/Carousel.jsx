"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "../../app/assets/images/image1.png";
import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    id: 1,
    src: Image1,
    alt: "Hero slide 1",
  },
  {
    id: 2,
    src: Image1,
    alt: "Hero slide 2",
  },
  {
    id: 3,
    src: Image1,
    alt: "Hero slide 3",
  },
  {
    id: 4,
    src: Image1,
    alt: "Hero slide 4",
  },
  {
    id: 5,
    src: Image1,
    alt: "Hero slide 5",
  },
];

export default function Carousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoplay || items.length < 2 || (pauseOnHover && isHovered)) {
      return undefined;
    }

    const timer = setInterval(() => {
      setPosition((current) => {
        const next = current + 1;
        return loop ? next % items.length : Math.min(next, items.length - 1);
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, items.length, loop, pauseOnHover]);

  if (!items.length) return null;

  const activePosition = Math.min(position, items.length - 1);

  return (
    <div
      className={`carousel-root ${round ? "round" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className='carousel-track'
        style={{ transform: `translateX(-${activePosition * 100}%)` }}>
        {items.map((item, index) => (
          <div
            className={`carousel-item ${round ? "round" : ""}`}
            key={`${item.id}-${index}`}>
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              className='carousel-slide-image'
              fill
              sizes='100vw'
            />
          </div>
        ))}
      </div>
      <div className='carousel-dots-wrapper'>
        <div className='carousel-dots'>
          {items.map((item, index) => (
            <button
              key={`${item.id}-dot`}
              type='button'
              className={`carousel-dot ${activePosition === index ? "active" : ""}`}
              onClick={() => setPosition(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
