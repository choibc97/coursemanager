import React from "react";
import { createStackNavigator } from "react-navigation";

import ScannerScreen from "../screens/ScannerScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { MenuButton } from "../util";

export default CheckoutStack = createStackNavigator(
    {
        Scanner: {
            screen: ScannerScreen
        },
        Checkout: {
            screen: CheckoutScreen
        },
    },
    {
        headerMode: "none"
    }
);
