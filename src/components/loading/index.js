import React from "react";
import { ActivityIndicator } from "react-native";

export function Loading({ loading, size }) {
    if (!loading) return null;

    return (
        <ActivityIndicator size={size} color="black"></ActivityIndicator>
    )
};