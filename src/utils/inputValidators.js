import { useTranslation } from 'react-i18next';


const inputValidators = () => {
    const { t } = useTranslation()
    const validationEmail = value => {
        let emailReg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w\w+)+$/;

        if (!emailReg.test(value)) {
            return (t('inputValidators.validationEmail'));
        } else if (emailReg.test(value)) {
            return '';
        }
    };
    const validationName = value => {
        let nameReg = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/;

        if (!nameReg.test(value)) {
            return (t('inputValidators.validationName'));
        } else if (nameReg.test(value)) {
            return '';
        };
    };

    return { validationEmail, validationName }
}

module.exports = inputValidators;
