import React, { useEffect, useRef } from "react";

export const TravelpayoutsWidget = ({ src, minHeight = 320 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !src) return;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [src]);

  return <div ref={containerRef} style={{ minHeight }} />;
};

export default TravelpayoutsWidget;
