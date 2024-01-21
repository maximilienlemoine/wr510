import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import React, {useEffect, useState} from "react";

export default function SearchPage() {
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="useless placeholder"
                keyboardType="default"
                pointerEvents={'none'}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 25,

    },
});