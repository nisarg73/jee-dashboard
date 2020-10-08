export const durations = ['All', '4 Years', '5 Years']

export const durationDropDownOptions = durations.map(function (element) {
  return {
    key: durations.indexOf(element),
    text: element,
    value: element
  }
})
