import React, { useState, useEffect } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-32 lg:bottom-8 right-0 lg:right-4 p-2 text-[#0e0f0f]"
        aria-label="Back to top"
        style={{ background: "none", border: "none" }}
      >
        <IoIosArrowDropupCircle className="text-4xl" />
      </button>
    )
  );
};

export default BackToTopButton;
