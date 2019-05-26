import React, { Component } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Container, Header, Left, Body, Right, Title } from "native-base";

import { BackButton, Styles } from "../util";

export default class CheckoutScreen extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left><BackButton /></Left>
                    <Body><Title>Scanner</Title></Body>
                    <Right></Right>
                </Header>
                <SafeAreaView style={Styles.safeView}>
                    <View style={Styles.centerView}>
                        <Text style={Styles.centerText}>
                            Checkout screen.
                    </Text>
                    </View>
                </SafeAreaView>
            </Container>
        );
    }
}
