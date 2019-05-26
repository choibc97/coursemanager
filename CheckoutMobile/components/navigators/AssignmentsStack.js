import { createStackNavigator } from "react-navigation";

import AssignmentsScreen from "../screens/AssignmentsScreen";
import AssignmentScreen from "../screens/AssignmentScreen";

export default AssignmentsStack = createStackNavigator(
    {
        Assignments: AssignmentsScreen,
        Assignment: AssignmentScreen
    },
    {
        headerMode: "none"
    }
);
