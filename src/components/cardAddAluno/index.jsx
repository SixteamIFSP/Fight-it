import React from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { variables } from "../../configuration/constants";
import { Container, ContainerImage } from "./styles";


export function CardAddAluno({ data }) {
    return (
        <Container style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3
        }} >
            <ContainerImage style={{ borderRadius: 40, }}>
                {
                    data?.pfp ?
                        <Image
                            source={
                                { uri: variables.IMAGES_URL + data?.pfp }
                            }
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 40
                            }}
                        />
                        :
                        <View>
                            <Ionicons name="md-person-outline" size={65} color="#ffffff" />
                        </View>
                }
            </ContainerImage>
            <View>
                <Text style={{ zIndex: 1, color: "#000000" }}>{data?.nome}</Text>
                <Text>{data?.email}</Text>
            </View>
        </Container>
    )
}