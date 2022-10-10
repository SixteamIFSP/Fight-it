export function convertDataUTC(data){
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    console.log((new Date()).getTimezoneOffset());

    return new Date(new Date(data)-tzoffset);
}

export function dateToBrDefault(date){
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')
}

export function dateSplit(date){
    return date.slice(0, 10);
}