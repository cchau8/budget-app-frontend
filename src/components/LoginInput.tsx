import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styled from "styled-components/native";

interface LoginInputProps {
    value: string;
    placeholder: string;
    isPassword?: boolean;
    onChangeText: (newValue: string) => void;
}

const LoginInput: React.FC<LoginInputProps> = ({
    value,
    placeholder,
    isPassword,
    onChangeText,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <InputView>
            <Input
                selectionColor="#837070"
                placeholderTextColor="#83707084"
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={isPassword ? !showPassword : false}
                autoCapitalize="none"
                keyboardType={placeholder === "Email" ? "email-address" : "default"}
            />
            {isPassword && (
                <Eye onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <MaterialCommunityIcons name="eye-off-outline" size={28} color="#837070" />
                    ) : (
                        <MaterialCommunityIcons name="eye-outline" size={28} color="#837070" />
                    )}
                </Eye>
            )}
        </InputView>
    );
};
const InputView = styled.View`
    width: 70%;
    margin: 20px 0;
    display: flex;
    justify-content: center;

    border: 1px solid #b1a1a1;
    border-radius: 25px;
`;
const Input = styled.TextInput`
    padding: 16px;
    color: #b1a1a1;
    font-size: 16px;
`;
const Eye = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
`;

export default LoginInput;
