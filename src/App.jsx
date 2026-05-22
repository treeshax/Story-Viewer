import { useEffect, useState } from 'react'
import StoryBar from './components/storyBar'
import StoryViewer from './components/storyviewer'
import UploadStory from './components/uploadStory'

export default function App() {
  const [stories, setStories] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem('stories')) || []

    // Remove expired stories
    const validStories = storedStories.filter(
      (story) => Date.now() - story.createdAt < 24 * 60 * 60 * 1000
    )

    localStorage.setItem('stories', JSON.stringify(validStories))

    setStories(validStories)
  }, [])

  const addStory = (story) => {
    const updatedStories = [...stories, story]

    setStories(updatedStories)

    localStorage.setItem('stories', JSON.stringify(updatedStories))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto pt-5">
        <h1 className="text-2xl font-bold px-4 mb-4">
          Stories Clone
        </h1>

        <div className="flex items-center gap-3 px-4">
          <UploadStory addStory={addStory} />
        </div>

        <StoryBar
          stories={stories}
          openStory={(index) => setActiveIndex(index)}
        />

        {activeIndex !== null && (
          <StoryViewer
            stories={stories}
            activeIndex={activeIndex}
            close={() => setActiveIndex(null)}
          />
        )}
      </div>
    </div>
  )
}