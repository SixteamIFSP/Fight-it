import React from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { variables } from "../../configuration/constants";
import { Container, ContainerImage } from "./styles";


export function CardAddAluno({data}){    
    return (
        <Container>
            <ContainerImage>
            {
                data?.pfp ?
                    <Image
                        source={
                            { uri: variables.IMAGES_URL + data?.pfp }
                        }
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                    :
                    <View>
                        <Ionicons name="md-person-outline" size={65} color="#ffffff" />
                    </View>
            }
            </ContainerImage>
            <View>
                <Text style={{zIndex:1, color:"#000000"}}>{data?.nome}</Text>
                <Text>{data?.email}</Text>
            </View>
        </Container>
    )
}