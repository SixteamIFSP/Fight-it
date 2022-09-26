export function dateToBrDefault(date){
    return date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')

}