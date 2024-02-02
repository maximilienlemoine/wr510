import {Button} from "react-native";

export default function CustomButton({event, color, title}) {
    return (
        <Button
            onPress={event}
            title={title}
            color={color}
            accessibilityLabel={title}
        />
    )
}