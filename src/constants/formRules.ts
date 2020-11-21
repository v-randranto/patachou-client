const FILE_LIMIT_SIZE = 500 * 1000;
const FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif'];

const PSEUDO_ALLOWED_CHAR = /[a-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž -]/i;
const NAME_PATTERN_BASE = `a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð`;
const PSEUDO_PATTERN = `^[${NAME_PATTERN_BASE}0-9]+(([' -][${NAME_PATTERN_BASE}0-9])?[${NAME_PATTERN_BASE}0-9]*)*$`;
const EMAIL_PATTERN = `^([a-z0-9.]+)@([a-z0-9-.]+).([a-z]{2,5})$`;

export const FORMAT_RULES = {
  fileLimit: FILE_LIMIT_SIZE,
  fileExtensions: FILE_EXTENSIONS,
  pseudoAllowedChars: PSEUDO_ALLOWED_CHAR,
  pseudoPattern: new RegExp(PSEUDO_PATTERN),
  emailPattern: new RegExp(EMAIL_PATTERN),
  pseudoMax: 20,
  emailMax: 50,
  passwordMax: 30,
  presentationMax: 120
}

export const TOOL_TIPS = {
  pseudo: 'chiffre autorisé',
  password: 'Saisir 8 caractères minimum avec 3 des caractéristiques suivantes: 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial',
  upload: 'Fichier de taiile 500ko maximum.'
}

export const ERRORS = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  required: (field: string) => {
    return `Je dois saisir ${field}.`
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  format: (field: string) => {
    return `J'ai mal saisi ${field}.`
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  size: (field: string, max: number) => {
    return `${max} caractères max dans le ${field}`
  },
   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
   mismatch: (field: string) => {
    return `${field} sont différents.`
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fileSize: (size: number) => {
    return `Le fichier excède ${size}Ko.`
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  fileType: (ext: string) => {
    return `L'extension .${ext} est refusée.`
  }
}