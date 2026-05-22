import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function StoryViewer({
  stories,
  activeIndex,
  close,
}) {
  const [currentIndex, setCurrentIndex] =
    useState(activeIndex)

  const [progress, setProgress] = useState(0)

  // Auto progress animation
  useEffect(() => {
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)

          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1)
          } else {
            close()
          }

          return 100
        }

        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div className="fixed inset-0 bg-black z-50">

      {/* Progress Bars */}
      <div className="absolute top-3 left-3 right-3 flex gap-2 z-50">
        {stories.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-gray-600 rounded"
          >
            <div
              className="h-1 bg-white rounded"
              style={{
                width:
                  index < currentIndex
                    ? '100%'
                    : index === currentIndex
                    ? `${progress}%`
                    : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        className="absolute top-6 right-5 text-white text-3xl z-50"
        onClick={close}
      >
        ✕
      </button>

      <Swiper
        initialSlide={activeIndex}
        slidesPerView={1}
        onSlideChange={(swiper) =>
          setCurrentIndex(swiper.activeIndex)
        }
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="flex items-center justify-center h-screen">
              <img
                src={story.image}
                alt="story"
                className="max-h-screen object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}