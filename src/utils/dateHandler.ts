import { lightFormat } from 'date-fns'

export const ddmmyyyyFormat = (date: Date): string => {
    return lightFormat(date, 'dd.MM.yyyy')
}