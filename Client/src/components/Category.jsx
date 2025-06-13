import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { assets } from "../assets/assets";
import { category } from "../assets/assets";

function Category() {
  const [searchCategory, setSearchCategory] = useState(0);
  const containerRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollInfo = () => {
    if (containerRef.current) {
      setScroll(containerRef.current.scrollLeft);
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
    }
  };

  useLayoutEffect(() => {
    // Run after DOM paints to get accurate scrollWidth/clientWidth
    updateScrollInfo();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateScrollInfo);
    return () => window.removeEventListener("resize", updateScrollInfo);
  }, []);

  const scrollByAmount = 150;
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
    }
  };

  // When user scrolls, update scroll state
  const onScroll = () => {
    if (containerRef.current) {
      setScroll(containerRef.current.scrollLeft);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        disabled={scroll <= 0}
        aria-label="Scroll categories left"
        className={`text-3xl p-1 rounded-full flex items-center justify-center transition-colors duration-200
          ${
            scroll <= 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
      >
        <assets.MdChevronLeft />
      </button>

      {/* Category buttons container */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="flex gap-3 px-2 py-1 rounded-full overflow-x-auto scrollbar-hide bg-gray-100 dark:bg-slate-800"
      >
        {category.map((item, index) => (
          <button
            key={index}
            onClick={() => setSearchCategory(index)}
            className={`min-w-max px-4 py-1 rounded-md font-semibold transition-colors duration-300 whitespace-nowrap
              ${
                searchCategory === index
                  ? "bg-blue-600 text-white shadow-md shadow-blue-400"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
              }`}
            aria-pressed={searchCategory === index}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        disabled={scroll >= maxScroll}
        aria-label="Scroll categories right"
        className={`text-3xl p-1 rounded-full flex items-center justify-center transition-colors duration-200
          ${
            scroll >= maxScroll
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
      >
        <assets.MdChevronRight />
      </button>
    </div>
  );
}

export default Category;
