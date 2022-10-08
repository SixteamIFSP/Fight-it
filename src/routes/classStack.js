import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClassView } from "../screen/classView";
import { EvaluationStudent } from "../screen/evaluationStudent";
import { StudantView } from "../screen/studantView";
import { TeacherClass } from "../screen/teacherClass";
import { useTranslation } from 'react-i18next';
import { ContainerSVG } from "../screen/configureAccount/styles";
import { FontAwesome } from "@expo/vector-icons";
import { TriagemView } from "../screen/triagemView";
import { useModal } from "../hooks/modalConfirmation";

export function ClassStackAluno(){
    const StackClass = createNativeStackNavigator();

    const { changeModal } = useModal();
    const { t } = useTranslation();
    return(
        <StackClass.Navigator >
            <StackClass.Screen options={{ title: t("navigationHeader.Class") }} navigationKey='ClassStackTeacher' name="ClassStackTeacher" component={TeacherClass}></StackClass.Screen>
            {/* <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassInfo' name="ClassInfo" component={TeacherClass}></StackClass.Screen> */}
            <StackClass.Screen 
                options={
                    ({route}) => ({
                        title: route.params.title,
                        headerRight: () => (
                            <ContainerSVG onPress={() => changeModal()}>
                                <FontAwesome name={'trash'} size={30} color="#cc0000" />
                            </ContainerSVG>
                        ),
                    })   
                    } 
                navigationKey='ClassView'
                name="ClassView"
                component={ClassView}></StackClass.Screen>
            <StackClass.Screen
            options={({route}) => ({
                title: route.params.title,
                headerRight: () => (
                    <ContainerSVG onPress={() => changeModal()}>
                        <FontAwesome name={'trash'} size={30} color="#cc0000" />
                    </ContainerSVG>
                ),
                })}

            navigationKey='StudantView'
            name="StudantView"
            component={StudantView}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='EvaluationStudent' name="EvaluationStudent" component={EvaluationStudent}></StackClass.Screen>

            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='TriagemView' name="TriagemView" component={TriagemView}></StackClass.Screen>
        </StackClass.Navigator>
    )
}

export function ClassStackTeacher(){
    const StackClass = createNativeStackNavigator();

    const { changeModal } = useModal()
    const { t } = useTranslation()
    return(
        <StackClass.Navigator >
            <StackClass.Screen options={{ title: t("navigationHeader.Class") }} navigationKey='ClassStackTeacher' name="ClassStackTeacher" component={TeacherClass}></StackClass.Screen>
            {/* <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='ClassInfo' name="ClassInfo" component={TeacherClass}></StackClass.Screen> */}
            <StackClass.Screen 
                options={
                    ({route}) => ({
                        title: route.params.title,
                        headerRight: () => (
                            <ContainerSVG onPress={() => changeModal()}>
                                <FontAwesome name={'trash'} size={30} color="#cc0000" />
                            </ContainerSVG>
                        ),
                    })   
                    } 
                navigationKey='ClassView'
                name="ClassView"
                component={ClassView}></StackClass.Screen>
            <StackClass.Screen
            options={({route}) => ({
                title: route.params.title,
                headerRight: () => (
                    <ContainerSVG onPress={() => changeModal()}>
                        <FontAwesome name={'trash'} size={30} color="#cc0000" />
                    </ContainerSVG>
                ),
                })}

            navigationKey='StudantView'
            name="StudantView"
            component={StudantView}></StackClass.Screen>
            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='EvaluationStudent' name="EvaluationStudent" component={EvaluationStudent}></StackClass.Screen>

            <StackClass.Screen options={({route}) => ({title: route.params.title})} navigationKey='TriagemView' name="TriagemView" component={TriagemView}></StackClass.Screen>
        </StackClass.Navigator>
    )
}