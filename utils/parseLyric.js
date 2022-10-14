export function parseLyric(lyric) {
  const lyricInfos = new Array()
  const lyricLines = lyric.split('\n')
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  for (const lineString of lyricLines) {
    const res = timeReg.exec(lineString)
    if (res) {
      const minute = res[1] * 60 * 1000
      const second = res[2] * 1000
      const mSecond = res[3].length === 2 ? res[3] * 10 : res[3] * 1
      const time = minute + second + mSecond
      const lyricInfo = {
        text: lineString.replace(timeReg,""),
        time
      }
      lyricInfos.push(lyricInfo)
    }
  }
  return lyricInfos
}