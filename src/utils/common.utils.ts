import moment from "moment";
import { convertHexToString } from "xrpl";

export function getTokenName(value: string) {
    return value.length === 40 ? convertHexToString(value).replace(/\u0000/g, '') : value;
}

export function numberWithCommas(x: number) {
    if (x === undefined || x === null) return;

    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 4);
    }

    return parts.join('.');
};

export function valueToLocaleString(value: string, decimal: number = 4) {
    if (!value) return '-';

    if (/^\d*\.?\d+$/.test(value)) return parseFloat(value).toLocaleString(undefined, {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
    })

    return value;
}

export function renderValue(value: undefined | null | string | number | object | Date, options?: { decimal?: number, date?: boolean }) {
    if (value === undefined || value === null) return '-';

    // Check if it's date
    if (options?.date && moment(value).isValid()) {
        return moment(value).format('DD/MM/YYYY');
    }

    if (typeof value === 'string') {
        return valueToLocaleString(value, options?.decimal);
    }

    if (typeof value === 'number') {
        return numberWithCommas(value);
    }

    if (typeof value === 'object') {
        return JSON.stringify(value);
    }

    return value;
};

export function getRelativeTime(time: string) {
    moment.locale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: 'a few seconds',
            ss: '%d seconds',
            m: "a minute",
            mm: "%d minutes",
            h: "An hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            w: "A week",
            ww: "%d weeks",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    })
    return moment(time).fromNow();
}