import React, { useState } from "react";
import { Text, View, Modal, Pressable } from "react-native";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

export const ConfirmModal = ({value, changeModal, textModal, confirmAction})=>{
    const { t } = useTranslation()
    return (
        <View style={styles.modal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={value}
            >
                <View style={styles.outerView}>
                   
                    <View style={styles.modalView}>
                        <Text style={styles.textLine}>{textModal ? textModal.toUpperCase() : ''}</Text>
                        <Pressable onPress={() => confirmAction()}>
                            <Text style={styles.textClose}>{(t('figthtItModal.deleteClassConfirm'))}</Text>
                        </Pressable>
                        <Pressable onPress={() =>changeModal()}>
                            <Text style={styles.textClose}>{(t('figthtItModal.deleteClassClose'))}</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </View> 
    )
}