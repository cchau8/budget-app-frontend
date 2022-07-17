import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import { API_URL } from "react-native-dotenv";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginInput from "../components/LoginInput";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { RootState } from "../store/store";

interface SignupProps {
    // setToken: (token: string) => void;
}
type Nav = {
    goBack: () => void;
};

const RegisterScreen: React.FC<SignupProps> = () => {
    const navigation = useNavigation<Nav>();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const userData = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const checkPassword = (password: string, confirmPassword: string): string => {
        const errors: string[] = [];
        // The following pattern check if the password has : upper + lowercase + number and special char
        const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
        if (password !== confirmPassword) {
            errors.push("The passwords are not identical.");
        }
        if (password.length < 8 || password.length > 20) {
            errors.push("The password should have between 8 and 20 caracters.");
        }
        if (!pattern.test(password)) {
            errors.push(
                "The password should contain a number, an uppercase letter, a lowercase letter, and a special caracter."
            );
        }
        if (errors.length === 0) {
            return "";
        } else {
            return errors.join("\n");
        }
    };

    const handleRegister = async () => {
        try {
            if (!username || !password || !confirmPassword || !email) {
                return Alert.alert("Warning", "Please fill all the fields");
            }
            const passwordErrors: string = checkPassword(password, confirmPassword);
            if (passwordErrors.length > 0) {
                return Alert.alert("Warning", passwordErrors);
            }

            const response = await axios.post(`${API_URL}/user/signup`, {
                username: username,
                email: email,
                password: password,
            });

            if (response.status === 200) {
                dispatch(setUser(response.data));
                Alert.alert("Good", "User successfully created");
            }
        } catch (error: any) {
            Alert.alert("error", error.message);
            console.log(error);
        }
    };

    return (
        <MainView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
            <Title>Register</Title>
            <LoginInput
                value={email}
                onChangeText={(newValue: string) => {
                    setEmail(newValue);
                }}
                placeholder="Email"
            />
            <LoginInput
                value={username}
                onChangeText={(newValue: string) => {
                    setUsername(newValue);
                }}
                placeholder="Username"
            />
            <LoginInput
                value={password}
                onChangeText={(newValue: string) => {
                    setPassword(newValue);
                }}
                isPassword
                placeholder="Password"
            />
            <LoginInput
                value={confirmPassword}
                isPassword
                onChangeText={(newValue: string) => {
                    setConfirmPassword(newValue);
                }}
                placeholder="Confirm Password"
            />
            <TouchableOpacity onPress={() => handleRegister()}>
                <SubmitTxt>Submit</SubmitTxt>
            </TouchableOpacity>
            <GoBackBtn onPress={() => navigation.goBack()}>
                <GoBackBtnText>Already have an account ? Tap to log in.</GoBackBtnText>
            </GoBackBtn>
        </MainView>
    );
};

const MainView = styled(KeyboardAwareScrollView)`
    height: 100%;
    width: 100%;
    position: relative;
    font-family: "Roboto_400Regular";
    background-color: #1f1a22;
    padding-top: 20%;
`;
const Title = styled.Text`
    font-size: 24px;
    color: #b1a1a1;
    margin: 60px 0;
`;

const SubmitTxt = styled.Text`
    color: #b1a1a1;
    margin: 20px 0;
    font-size: 20px;
    font-family: "Roboto_700Bold";
`;
const GoBackBtn = styled.TouchableOpacity`
    border-bottom: 1px solid #b1a1a1;
    display: flex;
    align-items: center;
    padding: 5px 0;
`;
const GoBackBtnText = styled.Text`
    color: #b1a1a1;
    font-size: 14px;
    font-family: "Roboto_400Regular";
    text-align: center;
    text-decoration: underline;
`;

export default RegisterScreen;
