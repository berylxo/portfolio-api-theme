import { useState } from 'react';

function ImageCarousel({ images = [], label }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  if (count === 0) {
    return (
      <div className="shot shot-empty">
        <span>Screenshots coming soon</span>
      </div>
    );
  }

  const show = (next) => setIndex((next + count) % count);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    }
  };

  return (
    <figure
      className="shot"
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={count > 1 ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div className="shot-frame">
        {images.map((image, position) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`shot-image ${position === index ? 'is-current' : ''}`}
            loading={position === 0 ? 'eager' : 'lazy'}
            aria-hidden={position !== index}
          />
        ))}

        {count > 1 && (
          <div className="shot-controls">
            <button
              type="button"
              className="shot-arrow"
              onClick={() => show(index - 1)}
              aria-label="Previous screenshot"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="shot-arrow"
              onClick={() => show(index + 1)}
              aria-label="Next screenshot"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <figcaption className="shot-caption">
        <span className="shot-text" aria-live="polite">
          {images[index].caption}
        </span>

        {count > 1 && (
          <div className="shot-dots">
            {images.map((image, position) => (
              <button
                key={image.src}
                type="button"
                className={`shot-dot ${position === index ? 'is-current' : ''}`}
                onClick={() => show(position)}
                aria-label={`Screenshot ${position + 1} of ${count}`}
                aria-current={position === index}
              />
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default ImageCarousel;
