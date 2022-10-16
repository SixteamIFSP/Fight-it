export function convertDataUTC(data) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;

    return new Date(new Date(data) - tzoffset);
};

export function dateToBrDefault(date) {
    console.log(date, 'dateeee');
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
};

export function MMDDYYYToBrDefault(date) {
    return date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3');
};

export function dateSplit(date) {
    return date.slice(0, 10);
};

export function convertDateToBrString(date) {
    let dateToISO = date.toISOString();
    const splittedDate = dateSplit(dateToISO);
    return dateToBrDefault(splittedDate);
};