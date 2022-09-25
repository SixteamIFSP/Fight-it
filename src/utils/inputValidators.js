const inputValidators = () => {
    const validationEmail = value => {
        let emailReg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;
        if (emailReg.test(value) === false) {
            return 'Digite um email válido';
        } else if (emailReg.test(value) === true) {
            return '';
        }
    };
    const validationName = value => {
        let nameReg =  /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
        if (nameReg.test(value) === false) {
            return 'Digite um nome válido';
        } else if (nameReg.test(value) === true) {
            return '';
        };
    };
    return { validationEmail, validationName }
}

module.exports = inputValidators;