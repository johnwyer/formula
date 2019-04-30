import moment from 'moment';

export const getRaceDate = (dateStart, dateEnd) => {
    let start = moment(dateStart).format("MMM-DD").toLowerCase().split('-');
    let end = moment(dateEnd).format("MMM-DD").toLowerCase().split('-');
    let date = (start[0] === end[0]) ? `${start[1]}-${end[1]} ${start[0]}` : `${start[1]} ${start[0]} - ${end[1]} ${end[0]}`;

    return date;
};