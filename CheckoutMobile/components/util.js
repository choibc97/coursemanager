import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";
import { Icon } from "native-base";

export const Addresses = {
    users: "https://jsonplaceholder.typicode.com/users",
    posts: "https://jsonplaceholder.typicode.com/posts",
    comments: "https://jsonplaceholder.typicode.com/comments",
};

export const Styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerText: {
        textAlign: 'center'
    }
});

// a menu button to be included in drawer navigators
class CustomMenuButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
            </TouchableOpacity>
        );
    }
}

export const MenuButton = withNavigation(CustomMenuButton);

// a back button for navigators
class CustomBackButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
            </TouchableOpacity>
        );
    }
}

export const BackButton = withNavigation(CustomBackButton);

class ListItem extends PureComponent {
    onPress() {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={Styles.flatListRow}>
                    <Text style={Styles.flatListBigText}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}


// a list view that supports dropdown feature
// displays an icon on the left of a row
export class IconList extends PureComponent {

}
