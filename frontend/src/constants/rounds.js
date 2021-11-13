export const rounds = ['3', '2', '1']

export const roundDropDownOptions = rounds.map(function (element) {
  return {
    key: rounds.indexOf(element),
    text: element,
    value: element
  }
})
