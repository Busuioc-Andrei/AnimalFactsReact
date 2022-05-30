import React from "react";
import { Button, Image } from "react-native";
import * as Google from 'expo-auth-session/providers/google';
import { useUserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text } from "react-native-paper";

const LoginGoogle = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '668740794003-996680440o1avbcsp9a34cvf89t9lg1j.apps.googleusercontent.com',
      });

    const { loadToken, user } = useUserContext();

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if(authentication)
                loadToken(authentication);
        }
    }, [response]);
    
    if(user)
        return (
            <SafeAreaView>
                <Text>Welcome {user.name}</Text>
                <Avatar.Image source={{uri: user.picture}} />
                <Button
                    disabled={!request}
                    title="Login"
                    onPress={() => {
                        promptAsync();
                        }}
                    />
            </SafeAreaView>
        )
    else
        return (
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                    }}
                />
        )
}

export default LoginGoogle;