const readFile = (file) => {
    if (file) {
       const reader = new FileReader()
       reader.readAsDataURL(file)
       reader.onload = () => {
          const photo = {
             name: file.name,
             contentType: file.type,
             content: reader.result
          }
          return photo
       }
    }
 }

 export default readFile