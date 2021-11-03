export const years = ['2021', '2020', '2019', '2018', '2017', '2016']

export const yearDropDownOptions = years.map(function (element) {
  return {
    key: years.indexOf(element),
    text: element,
    value: element
  }
})
