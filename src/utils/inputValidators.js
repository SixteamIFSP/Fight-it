const inputValidators = () => {
    const validationEmail = value => {
        let emailReg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;
        if (emailReg.test(value) === false) {
            return 'Digite um email válido';
        } else if (emailReg.test(value) === true) {
            return '';
        }
    };
    return { validationEmail }
}

module.exports = inputValidators;