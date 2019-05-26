import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Container, Header, Left, Body, Right, Title } from "native-base";
import { connect } from "react-redux";

import QRCodeScanner from "react-native-qrcode-scanner";

import { MenuButton, Styles } from "../util";
import { scan } from "../../actions/checkoutActions";

class ScannerScreen extends Component {
    onSuccess(e) {
        this.props.navigation.navigate("Checkout");
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left><MenuButton /></Left>
                    <Body><Title>Scanner</Title></Body>
                    <Right></Right>
                </Header>
                <SafeAreaView style={Styles.safeView}>
                    <QRCodeScanner
                        onRead={(e) => this.onSuccess(e)}
                    />
                </SafeAreaView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isPending: state.checkout.isPending,
    response: state.checkout.response,
    error: state.checkout.error,
});

export default connect(mapStateToProps, { scan })(ScannerScreen);
