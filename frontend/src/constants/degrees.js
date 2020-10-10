export const degrees = [
  'All',
  'B.Tech',
  'BSc',
  'B.Tech + M.Tech (IDD)',
  'Int MSc.',
  'B.Arch',
  'Int M.Tech',
  'B.Pharm',
  'B.Pharm + M.Pharm'
]

export const degreeDropDownOptions = degrees.map(function (element) {
  return {
    key: degrees.indexOf(element),
    text: element,
    value: element
  }
})
