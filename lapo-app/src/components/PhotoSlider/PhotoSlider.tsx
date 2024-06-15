import { useEffect, useRef, useState } from 'react';
import { aboutUsPhoto } from '../../utils/aboutUsPhoto';
import { BASE_URL } from '../../utils/fetchProducts';
import './PhotoSlider.scss';
import classNames from 'classnames';
// visibleImages * (itemWidth + gap / 10)

export const PhotoSlider = () => {
  const visibleImages = 2;
  const [currentIndex, setCurrentIndex] = useState(visibleImages);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const gap = 40; // Gap between images in pixels
  const itemWidth = 100 / visibleImages; // Width of each item in percentage
  const transitionTime = 300;
  const totalImages = aboutUsPhoto.length;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      if (currentIndex === 0) {
        setCurrentIndex(totalImages);
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
          sliderRef.current.style.transform = `translateX(-${totalImages * (itemWidth + gap / 10)}%)`;
        }
      } else if (currentIndex >= totalImages + visibleImages) {
        setCurrentIndex(visibleImages);
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'none';
          sliderRef.current.style.transform = `translateX(-${visibleImages * (itemWidth + gap / 10)}%)`;
        }
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener('transitionend', handleTransitionEnd);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    };
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning && sliderRef.current) {
      sliderRef.current.style.transition = `transform ease-in-out ${transitionTime}ms`;
    }
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * (itemWidth + gap / 10)}%)`;
    }
  }, [currentIndex, isTransitioning]);

  return (
    <div className="slider">
      <div className="slider__header">
        <div className="slider__dots">
          {aboutUsPhoto.map((_, index) => (
            <span
              key={index}
              className={classNames('slider__dot', {
                'slider__dot-active': index === (currentIndex - visibleImages + totalImages) % totalImages,
              })}
              onClick={() => setCurrentIndex(index + visibleImages)}
            />
          ))}
        </div>
        <div className="slider__buttons">
          <div className="slider__right" onClick={prevSlide}>
          <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4373 16L21.0373 22.6L19.152 24.4866L10.6667 16L19.152 7.51465L21.0373 9.39998L14.4373 16Z"
            fill="currentColor"
          />
        </svg>
          </div>
          <div className="slider__right" onClick={nextSlide}>
          <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5626 16L10.9626 9.39999L12.848 7.51599L21.3333 16L12.848 24.4853L10.9626 22.5987L17.5626 16Z"
            fill="currentColor"
          />
        </svg>
          </div>
        </div>
      </div>
      <div className="slider__content-wrapper">
        <div
          ref={sliderRef}
          className="slider__content"
        >
          {[...aboutUsPhoto.slice(-visibleImages), ...aboutUsPhoto, ...aboutUsPhoto.slice(0, visibleImages)].map((image, index) => (
            <div key={index} className="slider__item" style={{ width: `${itemWidth}%`}}>
              <img
                src={`${BASE_URL}/${image}`}
                alt={`Slide ${index}`}
                className="slider__photo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}