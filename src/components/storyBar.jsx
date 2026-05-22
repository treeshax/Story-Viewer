export default function StoryBar({ stories, openStory }) {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-5 scrollbar-hide">
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => openStory(index)}
          className="flex-shrink-0"
        >
          <img
            src={story.image}
            alt="story"
            className="w-20 h-20 rounded-full border-4 border-pink-500 object-cover"
          />
        </button>
      ))}
    </div>
  )
}