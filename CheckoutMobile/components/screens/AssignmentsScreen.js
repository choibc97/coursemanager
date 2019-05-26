import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Container, Header, Left, Body, Right, Title } from "native-base";
import { ListItem } from "react-native-elements";

import { MenuButton, Styles } from "../util";

export default class AssignmentsScreen extends Component {
    constructor(props) {
        super(props);

        this.list = [
            { title: "Placeholder 1" },
            { title: "Placeholder 2" },
        ];
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left><MenuButton /></Left>
                    <Body><Title>Assignments</Title></Body>
                    <Right></Right>
                </Header>
                <SafeAreaView style={Styles.safeView}>
                    {
                        this.list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                            />
                        ))
                    }
                </SafeAreaView>
            </Container>
        );
    }
}
