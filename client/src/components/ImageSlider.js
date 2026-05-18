import React, { useState, useEffect } from "react";

const images = [
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%234CAF50"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EИзображение 1%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%232196F3"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EИзображение 2%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23FF9800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EИзображение 3%3C/text%3E%3C/svg%3E',
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23E91E63"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32"%3EИзображение 4%3C/text%3E%3C/svg%3E',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическое переключение каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <h3>Галерея курсов</h3>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={images[currentIndex]}
          alt={`слайд ${currentIndex + 1}`}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            borderRadius: "10px",
          }}
        />
        <button
          onClick={goPrev}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          ◀
        </button>
        <button
          onClick={goNext}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          ▶
        </button>
      </div>
      <div style={{ marginTop: 10 }}>
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              margin: "0 5px",
              background: idx === currentIndex ? "#333" : "#ccc",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
