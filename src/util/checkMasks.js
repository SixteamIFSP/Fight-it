const checkMasks = () => {
    const validationEmail = value => {
        let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;
        if (reg.test(value) === false) {
            return 'Digite um email válido';
        } else if (reg.test(value) === true) {
            return '';
        }
    };

    return { validationEmail }
}

module.exports = checkMasks;