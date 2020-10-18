export const rounds = ['1']

export const roundDropDownOptions = rounds.map(function (element) {
  return {
    key: rounds.indexOf(element),
    text: element,
    value: element
  }
})
