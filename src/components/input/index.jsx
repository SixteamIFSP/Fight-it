import { InputStyle, Container } from "./styles";
import { ErrorMessage } from '../../components/errorMessage';

export function Input({width, errorMessage, ...rest }) {
    return (
        <Container width={width}>
            <InputStyle
                
                {...rest}
            />
            {errorMessage ? <ErrorMessage text={errorMessage}></ErrorMessage> : null}
        </Container>

    )
}