import { Text, View, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

export function FightItModal({ textButton, modalText, modalActive }) {
    const [modal, setModalActive] = useState(modalActive);
    return (
        <View style={styles.modal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => { setModalActive(false) }}
            >
                <View style={styles.outerView}>
                    <View style={styles.modalView}>
                            <Text style={styles.textLine}>{modalText ? modalText.toUpperCase() : ''}</Text>
                            <Pressable onPress={() => setModalActive(false)}>
                                <Text style={styles.textClose}>{textButton ? textButton.toUpperCase() : 'FECHAR'}</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

/* uso
  let [setModalVisible] = useState(false);
      <FightItModal
        textButton="FECHAR"
        modalText
        modalActive={visibleModal}
      ></FightItModal>
      <Text onPress={() => { visibleModal = true }}>assasa</Text>
      */