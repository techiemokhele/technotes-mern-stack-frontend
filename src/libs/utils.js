import { format, parse } from 'date-fns'

const dateFormat = "MMM yyyy"

export const formatDate = (dateString) => {
    try {
        const [day, month, year] = dateString.split('-')
        const date = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date())
        return format(date, dateFormat)
    } catch (error) {
        return "Invalid date"
    }
}