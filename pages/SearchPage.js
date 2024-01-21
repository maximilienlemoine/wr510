import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";

export default function SearchPage() {

    return (
        <SafeAreaView style={styles.container}>
            <TextInput></TextInput>

            <StatusBar style="auto"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});