export function bufferToImage(buffer?: ArrayBuffer) {
  if (!buffer) return ""
  const blob = new Blob([buffer])
  return URL.createObjectURL(blob)
}