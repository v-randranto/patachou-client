import { lightFormat } from 'date-fns'

export const ddmmyyyyFormat = (date) => {
    return lightFormat(date, 'dd.MM.yyyy')
}