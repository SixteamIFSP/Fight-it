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
        let nameReg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;

        if (!nameReg.test(value)) {
            return 'Digite um nome válido';
        } else if (nameReg.test(value)) {
            return '';
        };
    };

    return { validationEmail, validationName }
}

module.exports = inputValidators;
