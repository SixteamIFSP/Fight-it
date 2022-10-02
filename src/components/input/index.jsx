import { InputStyle, View } from "./styles";
import { ErrorMessage } from '../../components/errorMessage';

export function Input({ errorMessage, ...rest }) {
    return (
        <View>
            <InputStyle
                {...rest}
            />
            {errorMessage ? <ErrorMessage text={errorMessage}></ErrorMessage> : null}
        </View>

    )
}