"use client";

import { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import "../styles/App.css";
import Home from "./home";
import Loading from "./loading_page/loading";

export default function AppClient() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    document.body.style.overflow = showLoader ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  useEffect(() => {
    if (showLoader) return undefined;

    const lenis = new Lenis();
    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, [showLoader]);

  const handleLoaded = useCallback(() => setShowLoader(false), []);

  return (
    <div>
      <div className='home'>
        <div className='home-content'>
          <Home />
        </div>
      </div>
      {showLoader && (
        <div className='loader'>
          <Loading onLoaded={handleLoaded} />
        </div>
      )}
    </div>
  );
}
