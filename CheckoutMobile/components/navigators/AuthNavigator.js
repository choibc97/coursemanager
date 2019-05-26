import { createSwitchNavigator } from "react-navigation";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import InstructorNavigator from "../navigators/InstructorNavigator";
import StudentNavigator from "../navigators/StudentNavigator";

export default AuthNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Instructor: InstructorNavigator,
    Student: StudentNavigator,
});
