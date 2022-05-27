import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClassView } from "../screen/classView";
import { TeacherClass } from "../screen/teacherClass";

const StackClass = createNativeStackNavigator();

export function ClassStack(){

    return(

        <StackClass.Navigator >
            <StackClass.Screen options={{ title: "Turma" }} navigationKey='ClassStack' name="ClassStack" component={TeacherClass}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassInfo' name="ClassInfo" component={TeacherClass}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassView' name="ClassView" component={ClassView}></StackClass.Screen>

        </StackClass.Navigator>
    )

}