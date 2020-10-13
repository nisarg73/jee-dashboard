export const iits = [
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

export const nits = [
  'All',
  'NIT-Jalandhar',
  'NIT-Jaipur',
  'NIT-Bhopal',
  'NIT-Allahabad',
  'NIT-Agartala',
  'NIT-Calicut',
  'NIT-Delhi',
  'NIT-Durgapur',
  'NIT-Goa',
  'NIT-Hamirpur',
  'NIT-Karnataka-Surathkal',
  'NIT-Meghalaya',
  'NIT-Nagaland',
  'NIT-Patna',
  'NIT-Puducherry',
  'NIT-Raipur',
  'NIT-Sikkim',
  'NIT-Arunachal-Pradesh',
  'NIT-Jamshedpur',
  'NIT-Kurukshetra',
  'NIT-Manipur',
  'NIT-Mizoram',
  'NIT-Rourkela',
  'NIT-Silchar',
  'NIT-Srinagar',
  'NIT-Tiruchirappalli',
  'NIT-Uttarakhand',
  'NIT-Warangal',
  'NIT-Surat',
  'NIT-Nagpur',
  'NIT-Andhra-Pradesh'
]

export const iitDropDownOptions = iits.map(function (element) {
  return {
    key: iits.indexOf(element),
    text: element,
    value: element
  }
})

export const nitDropDownOptions = nits.map(function (element) {
  return {
    key: nits.indexOf(element),
    text: element,
    value: element
  }
})
