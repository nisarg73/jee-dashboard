export const institutes = [
  'All',
  'IIT-Bombay',
  'IIT-Delhi',
  'IIT-Kharagpur',
  'IIT-Kanpur',
  'IIT-Madras',
  'IIT-Roorkee',
  'IIT-Guwahati',
  'IIT-Indore',
  'IIT-Hyderabad',
  'IIT-(BHU) Varanasi',
  'IIT-(ISM) Dhanbad',
  'IIT-Bhubaneswar',
  'IIT-Mandi',
  'IIT-Patna',
  'IIT-Gandhinagar',
  'IIT-Ropar',
  'IIT-Jodhpur',
  'IIT-Tirupati',
  'IIT-Bhilai',
  'IIT-Dharwad',
  'IIT-Goa',
  'IIT-Jammu',
  'IIT-Palakkad'
]

export const instituteDropDownOptions = institutes.map(function (element) {
  return {
    key: institutes.indexOf(element),
    text: element,
    value: element
  }
})
