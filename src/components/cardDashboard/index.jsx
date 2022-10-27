import React from "react";
import { Container, TextContent, TextDescription } from "./styles";

export function CardDashboard({text, value}){

    return (
        <Container>
            <TextDescription>
                {text}
            </TextDescription>
            <TextContent>
                {value || 0}
            </TextContent>
        </Container>
    )

}