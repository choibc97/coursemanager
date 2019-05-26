import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { Icon } from "native-base";

import CheckoutStack from "../navigators/CheckoutStack";
import AboutScreen from "../screens/AboutScreen";

export default InstructorNavigator = createDrawerNavigator({
    Checkout: {
        screen: CheckoutStack,
        navigationOptions: {
            drawerIcon: <Icon name="camera" />
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            drawerIcon: <Icon name="book" />
        }
    }
});
