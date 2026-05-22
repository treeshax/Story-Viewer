import { FaPlus } from 'react-icons/fa'

export default function UploadStory({ addStory }) {
  const handleUpload = (e) => {
    const file = e.target.files[0]

    if (!file) return
    const isVideo = file.type.startsWith('video')
    if (isVideo) {
  const videoURL = URL.createObjectURL(file)

  const newStory = {
    id: Date.now(),
    type: 'video',
    media: videoURL,
    createdAt: Date.now(),
  }

  addStory(newStory)

  return
}

const img = new Image()
const objectURL = URL.createObjectURL(file)

img.onload = () => {
  let width = img.width
  let height = img.height

  const maxWidth = 1080
  const maxHeight = 1920

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(
      maxWidth / width,
      maxHeight / height
    )

    width *= ratio
    height *= ratio
  }

  const canvas = document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, width, height)

  const base64 = canvas.toDataURL(
    'image/jpeg',
    0.8
  )

  const newStory = {
    id: Date.now(),
    type: 'image',
    media: base64,
    createdAt: Date.now(),
  }

  addStory(newStory)
}

img.src = objectURL
  }

  return (
    <label className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer">
      <FaPlus />

      <input
        type="file"
        accept="image/*,video/*"
        hidden
        onChange={handleUpload}
      />
    </label>
  )
}