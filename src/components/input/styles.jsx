import styled from 'styled-components/native';

export const Container = styled.View`
        width: ${(props) => props.width ? props.width : "70%"};
        justify-content: center;
        flex-direction: column;
        align-items: center;
`;
export const InputStyle = styled.TextInput`
    width: 100%;
    margin-bottom: 12px;
    margin-top: 5px;
    border-width: 1px;
    border-top-width:0;
    border-left-width:0;
    border-right-width:0; 
`   