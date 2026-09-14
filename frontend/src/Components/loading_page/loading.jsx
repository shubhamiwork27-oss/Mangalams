"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import "../../styles/loader.css";
import logo from "../../assets/images/M.png";

const Loading = ({ onLoaded }) => {
  const [percent, setPercent] = useState(0);
  const loaderRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const counter = { val: 0 };
    const timeline = gsap.timeline();

    timeline
      .to(counter, {
        val: 100,
        duration: 2.4,
        ease: "power3.inOut",
        onUpdate: () => {
          const nextPercent = Math.round(counter.val);
          setPercent(nextPercent);

          if (fillRef.current) {
            gsap.set(fillRef.current, { width: `${nextPercent}%` });
          }
        },
      })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.75,
        ease: "power1.out",
        onComplete: () => onLoaded?.(),
      });

    return () => {
      timeline.kill();
    };
  }, [onLoaded]);

  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className='parentloader' ref={loaderRef}>
      <div className='landing-logo-frame'>
        <Image
          src={logo}
          alt='Mangalams lotus logo'
          width={80}
          height={80}
          className='landing-logo'
          priority
        />
      </div>
      <span className='loading-text'>Mangalams</span>

      <div className='line'>
        <div
          className='fill'
          ref={fillRef}
          style={{ width: `${clampedPercent}%` }}
        />
        <h1 className='loadnum' style={{ left: `${clampedPercent}%` }}>
          {clampedPercent}%
        </h1>
      </div>
    </div>
  );
};

export default Loading;
