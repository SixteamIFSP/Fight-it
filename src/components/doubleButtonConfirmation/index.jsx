import { useTranslation } from "react-i18next";
import { ButtonConfirm, Container, TextButton } from "./styles";


export function DoubleButtonConfirmation({handleConfirm, handleBack}){
    const {t} = useTranslation();

    return(
        <Container>
            <ButtonConfirm onPress={()=> handleBack()}>
                    <TextButton >{t('validation.cancel')}</TextButton>
            </ButtonConfirm>
            <ButtonConfirm onPress={()=> handleConfirm()}>
                    <TextButton confirm>{t('validation.confirm')}</TextButton>
            </ButtonConfirm>
        </Container>
    )
}