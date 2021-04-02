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
    presentationMax: 120,
};

export const TOOL_TIPS = {
    pseudo: 'chiffre autorisé',
    password:
        'Saisir 8 caractères minimum avec 3 des caractéristiques suivantes: 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial',
    upload: 'Fichier de taiile 500ko maximum.',
};

export const ERRORS = {
    required: (field) => {
        return `Je dois saisir ${field}.`;
    },

    format: (field) => {
        return `J'ai mal saisi ${field}.`;
    },

    size: (field, max) => {
        return `${max} caractères max dans le ${field}`;
    },

    mismatch: (field) => {
        return `${field} sont différents.`;
    },

    fileSize: (size) => {
        return `Le fichier excède ${size}Ko.`;
    },

    fileType: (ext) => {
        return `L'extension .${ext} est refusée.`;
    },
};
