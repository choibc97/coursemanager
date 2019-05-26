import React, { Component } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Container, Header, Left, Body, Right, Title } from "native-base";

import { MenuButton, Styles } from "../util";

export default class AboutScreen extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left><MenuButton /></Left>
                    <Body><Title>About</Title></Body>
                    <Right></Right>
                </Header>
                <SafeAreaView style={Styles.safeView}>
                    <View style={Styles.centerView}>
                        <Text style={Styles.centerText}>
                            This project was created by Benjamin Choi (WUSTL 2019) for his master's project.
                            Please maintain proper attribution.
                    </Text>
                    </View>
                </SafeAreaView>
            </Container>
        );
    }
}
