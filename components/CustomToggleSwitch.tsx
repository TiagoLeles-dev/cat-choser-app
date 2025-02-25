import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";

const CustomToggleSwitch: React.FC = () => {
    const [active, setActive] = useState(0);
    const translateX = new Animated.Value(active === 0 ? 0 : 1);

    const toggleSwitch = () => {
        const newValue = active === 0 ? 1 : 0;
        setActive(newValue);
        Animated.timing(translateX, {
            toValue: newValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.switchContainer}>
            <Animated.View
                style={[
                    styles.slider,
                    {
                        transform: [{
                            translateX: translateX.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 45] // Movimenta o botão deslizante
                            })
                        }]
                    }
                ]}
            />
            <TouchableOpacity style={styles.iconWrapper} onPress={toggleSwitch}>
                <Fontisto name="tinder" size={18} color={active === 0 ? "#FF3366" : "#BFBFC0"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={toggleSwitch}>
                <AntDesign name="star" size={18} color={active === 1 ? "#FFCC00" : "#BFBFC0"} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: "row",
        width: 100,
        height: 40,
        backgroundColor: "#E5E5E5",
        borderRadius: 20,
        alignItems: "center",
        paddingHorizontal: 5,
        position: "relative",
    },
    slider: {
        position: "absolute",
        width: 50,
        height: 35,
        backgroundColor: "white",
        borderRadius: 18,
        top: 2,
        left: 2,
        elevation: 5,
    },
    iconWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default CustomToggleSwitch;
