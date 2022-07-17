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

interface SigninProps {
    // setToken: (token: string) => void;
}
type Nav = {
    navigate: (value: string) => void;
};

const LoginScreen: React.FC<SigninProps> = () => {
    const navigation = useNavigation<Nav>();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const userData = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            if (!login || !password) {
                return Alert.alert("Warning", "Please fill all the fields");
            }
            const response = await axios.post(`${API_URL}/user/signin`, {
                login: login,
                password: password,
            });

            if (response.status === 200) {
                dispatch(setUser(response.data));
            }
        } catch (error) {
            Alert.alert("error", "probably 401");
            console.log(JSON.stringify(error));
        }
    };

    return (
        <MainView contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
            <Title>Login</Title>
            <LoginInput value={login} onChangeText={setLogin} placeholder="Username or Email" />
            <LoginInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                isPassword
            />
            <TouchableOpacity onPress={() => handleLogin()}>
                <SubmitTxt>Submit</SubmitTxt>
            </TouchableOpacity>
            <RegisterBtn
                onPress={() => {
                    // navigation.navigate("Register");
                    console.log(userData);
                }}
            >
                <RegisterBtnTxt>First time here ? Register now</RegisterBtnTxt>
            </RegisterBtn>
        </MainView>
    );
};

const MainView = styled(KeyboardAwareScrollView)`
    height: 100%;
    width: 100%;
    position: relative;
    font-family: "Roboto_400Regular";
    background-color: #1f2f49;
    padding-top: 20%;
`;
const Title = styled.Text`
    font-size: 24px;
    color: #bdb9c7;
    margin: 60px 0;
`;

const SubmitTxt = styled.Text`
    color: #bdb9c7;
    margin: 20px 0;
    font-size: 20px;
    font-family: "Roboto_700Bold";
`;

const RegisterBtn = styled.TouchableOpacity`
    border-bottom: 1px solid #bdb9c7;
    display: flex;
    align-items: center;
    padding: 5px 0;
`;
const RegisterBtnTxt = styled.Text`
    color: #bdb9c7;
    font-size: 14px;
    font-family: "Roboto_400Regular";
    text-align: center;
    text-decoration: underline;
`;

export default LoginScreen;
