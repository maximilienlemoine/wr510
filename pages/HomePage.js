import {Button, Text, View} from "react-native";
import CustomButton from "../components/customButton";
import CustomImage from "../components/customImage";
import {useState} from "react";

export default function HomePage() {
    const [text, setText] = useState("Hello World")
    const changeText = (newText) => {
        setText(newText)
    }

    return(
        <View>

            <Text>J'ai cliqué sur {text}</Text>
            <CustomButton
                changeText={changeText}
                color="orange"
                text="orange"
            />
            <CustomButton
                changeText={changeText}
                color="black"
                text="UWU"
            />
            <CustomImage
                imgSource="../assets/armin.png"
            />
        </View>
    )
}