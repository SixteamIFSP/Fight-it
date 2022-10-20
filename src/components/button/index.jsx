import { ButtonConfirm, Container, TextButton } from "./styles";


export function Button({handle, text, confirm}){
    return(
        <Container>
            <ButtonConfirm onPress={()=>handle()}>
                    <TextButton confirm={confirm}>{text}</TextButton>
            </ButtonConfirm>
        </Container>
    )
}