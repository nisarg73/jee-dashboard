export const years = ['2016', '2017', '2018', '2019', '2020']

export const yearDropDownOptions = years.map(function (element) {
  return {
    key: years.indexOf(element),
    text: element,
    value: element
  }
})
