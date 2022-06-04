import { useTranslation } from "react-i18next";
import { ButtonConfirm, Container, TextButton } from "./styles";


export function Button({handle, text, confirm}){
    const {t} = useTranslation();

    return(
        <Container>
            <ButtonConfirm onPress={()=>handle()}>
                    <TextButton confirm={confirm}>{text}</TextButton>
                   
            </ButtonConfirm>
        </Container>
    )
}