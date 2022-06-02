import { useTranslation } from "react-i18next";
import { ButtonConfirm, Container, TextButton } from "./styles";


export function DoubleButtonConfirmation({handleConfirm, handleBack}){
    const {t} = useTranslation();

    return(
        <Container>
            <ButtonConfirm onPress={()=> handleBack()}>
                    <TextButton >{t('validation.cancel')}</TextButton>
                    {/* TROCAR PARA ARQUIVO DE Nacionalização   */}
            </ButtonConfirm>
            <ButtonConfirm onPress={()=> handleConfirm()}>
                    <TextButton confirm>{t('validation.confirm')}</TextButton>
                    {/* TROCAR PARA ARQUIVO DE Nacionalização   */}
            </ButtonConfirm>
        </Container>
    )
}