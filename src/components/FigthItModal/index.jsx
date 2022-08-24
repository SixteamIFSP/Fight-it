import { Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

export function FightItModal({ textButton, modalText, modalActive }) {
    //ativa e desativa a modal
    const [setModalActive] = useState(false);
        return (
            <View style={styles.modal}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalActive}
                    onRequestClose={() => { setModalActive(false) }}
                >
                    <View style={styles.outerView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                <Text style={styles.modalText}>{modalText ? modalText : ''}</Text>
                                <Pressable onPress={() => setModalActive(false)}>
                                    <Text style={{ color: 'red' }}>{textButton ? textButton : 'Clique aqui para fechar'}</Text>
                                </Pressable>
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
}