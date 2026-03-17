export function bufferToImage(buffer?: ArrayBuffer) {
  if (!buffer) return ""
  const blob = new Blob([buffer])
  return URL.createObjectURL(blob)
}

export function getColor(id?: number) {
  if (!id) return "#e0e0e0"

  const hue = (id * 137) % 360
  return `hsl(${hue}, 60%, 75%)`
}