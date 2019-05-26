import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { Icon } from "native-base";

import AssignmentsStack from "../navigators/AssignmentsStack";
import AboutScreen from "../screens/AboutScreen";

export default StudentNavigator = createDrawerNavigator({
    Assignments: {
        screen: AssignmentsStack,
        navigationOptions: {
            drawerIcon: <Icon name="folder" />
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            drawerIcon: <Icon name="book" />
        }
    }
});