export function stringRandom(length: number): string {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomInd)
  }
  return result
}
