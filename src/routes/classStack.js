import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClassView } from "../screen/classView";
import { EvaluationStudent } from "../screen/evaluationStudent";
import { StudantView } from "../screen/studantView";
import { TeacherClass } from "../screen/teacherClass";
import { useTranslation } from 'react-i18next';

const StackClass = createNativeStackNavigator();

export function ClassStack(){
    const { t } = useTranslation()

    return(

        <StackClass.Navigator >
            <StackClass.Screen options={{ title: t("navigationHeader.Class") }} navigationKey='ClassStack' name="ClassStack" component={TeacherClass}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassInfo' name="ClassInfo" component={TeacherClass}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassView' name="ClassView" component={ClassView}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='StudantView' name="StudantView" component={StudantView}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='EvaluationStudent' name="EvaluationStudent" component={EvaluationStudent}></StackClass.Screen>

        </StackClass.Navigator>
    )

}