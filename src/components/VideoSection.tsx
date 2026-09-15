const VideoSection = () => {
  return (
    <section
      data-section="speaker-reel"
      className="bg-white py-12 md:py-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden rounded-lg shadow-sm"
          style={{ aspectRatio: '16 / 9' }}
        >
          <iframe
            src="https://www.youtube.com/embed/QuKRJyGGHhQ"
            title="Richard Johnson - Speaker Reel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
