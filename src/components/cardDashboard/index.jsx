import React from "react";
import { Container, TextContent, TextDescription } from "./styles";
import { Text, View } from 'react-native';

export function CardDashboard({ text, value }) {

    return (
        <View style={{
            shadowColor: "#ff6359",
            shadowOffset: {
                width: 2,
                height: 6,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,
            elevation: 18,
            width: '40%',
            borderColor: '#f5f5f5',
            borderStyle: 'solid',
            borderWidth: 0.1,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:10,
            marginBottom:10,
            marginRight:10,
            marginLef:10,
            
        }}>
            <TextDescription>
                <Text> {text}</Text>
            </TextDescription>
            <TextContent>
                {value || 0}
            </TextContent>
        </View>
    )

}