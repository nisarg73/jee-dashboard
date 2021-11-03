export const iitDegrees = [
  'All',
  'B.Tech',
  'BSc',
  'B.Tech + M.Tech (IDD)',
  'BS + MS (IDD)',
  'Int MSc.',
  'B.Arch',
  'Int M.Tech',
  'B.Pharm',
  'B.Pharm + M.Pharm'
]

export const nitDegrees = [
  'All',
  'B.Tech',
  'BSc',
  'B.Tech + M.Tech (IDD)',
  'Int MSc.',
  'B.Arch',
  'Int M.Tech',
  'B.Pharm',
  'B.Pharm + M.Pharm',
  'B.Plan',
  'BSc + MSc (IDD)',
  'Btech + M.Tech (IDD)'
]

export const iitDegreeDropDownOptions = iitDegrees.map(function (element) {
  return {
    key: iitDegrees.indexOf(element),
    text: element,
    value: element
  }
})

export const nitDegreeDropDownOptions = nitDegrees.map(function (element) {
  return {
    key: nitDegrees.indexOf(element),
    text: element,
    value: element
  }
})
