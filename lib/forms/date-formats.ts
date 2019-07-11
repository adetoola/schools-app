import * as moment from 'moment';

export default [
    { value: 'MM/DD/YYYY', label: `MM/DD/YYYY     (${moment().format('MM/DD/YYYY')})` },
    { value: 'DD.MM.YYYY', label: `DD.MM.YYYY     (${moment().format('DD.MM.YYYY')})` },
    { value: 'DD/MM/YYYY', label: `DD/MM/YYYY     (${moment().format('DD/MM/YYYY')})` },
    { value: 'YYYY-MM-DD', label: `YYYY-MM-DD     (${moment().format('YYYY-MM-DD')})` },
    { value: 'YYYY.MM.DD', label: `YYYY.MM.DD     (${moment().format('YYYY.MM.DD')})` },
    { value: 'MM.DD.YYYY', label: `MM.DD.YYYY     (${moment().format('MM.DD.YYYY')})` },
];

const startSunday = [
    { value: 'no', label: 'Calendars start on a Monday' },
    { value: 'yes', label: 'Calendars start on a Sunday' },
];

const timeFormats = [
    { value: '12H', label: `12 hour clock (${moment().format('kk:mm a')})` },
    { value: '24H', label: `24 hour clock (${moment().format('kk:mm')})` },
];

export { startSunday, timeFormats };
