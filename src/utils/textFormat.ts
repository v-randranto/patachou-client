export const toTitleCase = (value:string): string =>{
    return value.toLowerCase().replace(/(?:^|\s|\/|\-)\w/g, (match) => {
      return match.toUpperCase()
    })
  }