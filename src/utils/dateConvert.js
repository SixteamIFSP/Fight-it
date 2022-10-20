export function convertDataUTC(data){
    var tzoffset = (new Date()).getTimezoneOffset() * (60000 * 2);
    console.log("data",tzoffset);
    //console.log("data2", data.setMinutes(data.getMinutes() - (tzoffset * -1)));
    console.log("data",new Date(new Date(data)-(tzoffset*-1)));

    return new Date(new Date(data) - tzoffset);
};

export function dateToBrDefault(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
}
export function stringTimeBR(date){
    return date.replace(/(\d{2}):(\d{2}):(\d{2})/, '$1:$2');;
};

export function MMDDYYYToBrDefault(date) {
    return date.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3');
};

export function dateSplit(date){
    const objeto = new Date(date)
    return objeto.toISOString().slice(0, 10);
}
export function stringTimeSlice(date){
    return date.slice(11, 19);
}

export function convertDateToBrString(date){
    let string = date.toISOString();
    string  = dateSplit(string);
    return dateToBrDefault(string)
}

export function convertDateToTimeString(date){
    let string = stringTimeBR(
        stringTimeSlice(
                convertDataUTC(date).toISOString()
            )
        );
    return string;
}