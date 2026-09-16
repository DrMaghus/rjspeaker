import { useState } from 'react';
import { Play } from 'lucide-react';

const VideoSection = () => {
  const [activated, setActivated] = useState(false);

  return (
    <section
      data-section="speaker-reel"
      className="bg-white py-12 md:py-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden rounded-lg shadow-sm group"
          style={{ aspectRatio: '16 / 9' }}
        >
          {activated ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/QuKRJyGGHhQ?rel=0&modestbranding=1&iv_load_policy=3&controls=1&autoplay=1"
              title="Richard Johnson - Speaker Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setActivated(true)}
              aria-label="Reproducir video de Richard Johnson"
              className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
            >
              <img
                src="https://img.youtube.com/vi/QuKRJyGGHhQ/maxresdefault.jpg"
                alt="Richard Johnson - Speaker Reel"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center rounded-full bg-red-600/80 w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110 shadow-lg">
                  <Play
                    className="text-white ml-1"
                    size={32}
                    fill="white"
                    strokeWidth={0}
                  />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
