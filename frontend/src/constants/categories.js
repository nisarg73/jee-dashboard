export const categories = [
  'All',
  'GEN',
  'OBC-NCL',
  'SC',
  'ST',
  'GEN-EWS',
  'GEN-PWD',
  'OBC-NCL-PWD',
  'SC-PWD',
  'ST-PWD',
  'GEN-EWS-PWD'
]

export const categoryDropDownOptions = categories.map(function (element) {
  return {
    key: categories.indexOf(element),
    text: element,
    value: element
  }
})
