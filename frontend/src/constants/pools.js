export const pools = ['All', 'Gender-Neutral', 'Female-Only']

export const poolDropDownOptions = pools.map(function (element) {
  return {
    key: pools.indexOf(element),
    text: element,
    value: element
  }
})
