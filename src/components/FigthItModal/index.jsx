import { Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

export function FightItModal({ textButton, modalText, modalActive, setModalVisible }) {
    return (
        <View style={styles.modal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalActive}
                onRequestClose={() => { setModalVisible(false) }}
            >
                <View style={styles.outerView}>
                    <View style={styles.modalView}>
                            <Text style={styles.textLine}>{modalText ? modalText.toUpperCase() : ''}</Text>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text style={styles.textClose}>{textButton ? textButton.toUpperCase() : 'FECHAR'}</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}