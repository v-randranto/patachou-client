export const toTitleCase = (value) =>{
    return value.toLowerCase().replace(/(?:^|\s|\/|-)\w/g, (match) => {
      return match.toUpperCase()
    })
  }