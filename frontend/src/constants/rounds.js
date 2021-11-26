export const rounds = ['6', '5', '4', '3', '2', '1']

export const roundDropDownOptions = rounds.map(function (element) {
  return {
    key: rounds.indexOf(element),
    text: element,
    value: element
  }
})
