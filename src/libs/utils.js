import { format, parse } from 'date-fns';

const dateFormat = "MMM yyyy";
const fullDateFormat = "do MMMM yyyy"; // 'do' will give us the day of the month with ordinal

const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

export const formatDate = (dateString, full = false) => {
    try {
        const [day, month, year] = dateString.split('-');
        const date = parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());

        if (full) {
            return format(date, fullDateFormat, {
                formatters: {
                    do: (date) => {
                        const dayOfMonth = date.getDate();
                        return `${dayOfMonth}${nthNumber(dayOfMonth)}`;
                    },
                },
            });
        } else {
            return format(date, dateFormat);
        }
    } catch (error) {
        return "Invalid date";
    }
};