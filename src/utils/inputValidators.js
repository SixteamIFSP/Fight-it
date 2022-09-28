const inputValidators = () => {
    const validationEmail = value => {
        let emailReg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;

        if (!emailReg.test(value)) {
            return 'Digite um email válido';
        } else if (emailReg.test(value)) {
            return '';
        }
    };
    const validationName = value => {
        let nameReg = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

        if (!nameReg.test(value)) {
            return 'Digite um nome válido';
        } else if (nameReg.test(value)) {
            return '';
        };
    };

    return { validationEmail, validationName }
}

module.exports = inputValidators;