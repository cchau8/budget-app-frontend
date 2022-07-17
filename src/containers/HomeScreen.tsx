// HomeScreen.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AccountsState, setAccounts } from "../store/accountSlice";
import { RootState } from "../store/store";

const API_URL = process.env.API_URL;

interface HomeScreenProps {
    // userToken: string;
}

interface Account {
    balance: number;
    // balanceOn: [{ date: Date; balance: number }];
    title: string;
    // categoryId: Schema.Types.ObjectId;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const userToken = useSelector((state: RootState) => state.user.token);
    const { accounts }: AccountsState = useSelector((state: RootState) => state.accounts);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`${API_URL}/accounts`, {
                    headers: { Authorization: `Bearer ${userToken}` },
                });
                if (response.status === 200) {
                    console.log(response.data);
                    dispatch(setAccounts(response.data));
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAccounts();
    }, []);

    const addAccount = async () => {
        const response = await axios.post(`${API_URL}/account`);
    };

    return isLoading ? (
        <View>
            <Text>Loading</Text>
        </View>
    ) : (
        <View>
            <FlatList data={accounts} renderItem={({ item }) => <Text>{item.title}</Text>} />
            <View>
                <TouchableOpacity>
                    <Text>Add Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default HomeScreen;
