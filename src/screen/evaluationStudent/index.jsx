import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import SelectDropdown from "react-native-select-dropdown";
import { AddButton } from "../../components/addButton"
import { Button } from "../../components/button";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { createEvaluetion, criarNovoParametro, criarParametroDesempenho, getEvaluetion, getParams, getTypesParams, } from "../../controler/evaluetion";
import { toastMessage } from "../../util/toastMessage";
import { 
    AlingButtons,
    AlingDropDown,
    Container,
    ContainerEvaluation,
    EvaluationList,
    EvaluationSelect,
    styles,
    TextHeader
} from "./styles"


const RenderEvaluation = ({item, data, selectEvaluation, setSelectEvaluation})=>{
    function handleTouch(){
        setSelectEvaluation(0)
        setTimeout(() => {
            if (item?.id!==selectEvaluation)
                setSelectEvaluation(item?.id)
        }, 200);
        
    }

    return(
        <EvaluationSelect select={item?.id===selectEvaluation}  onPress={()=>handleTouch()}>
            <Text>{'id: '+item?.id}</Text>
            <Text>{'Nome: '+item?.nome}</Text>
            <Text>{'data: '+item?.criação.slice(0,10)}</Text>
        </EvaluationSelect>
    )
}

function CreatePerformace({ dataParams,  setCreatePerformace}){
    const [nomeDesempenho , setNomeDesempenho] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

    useEffect(()=>{
        const date = new Date();
        setDataCriacao(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`); 
    },[]);

    function handleSubmit(){
        if (nomeDesempenho!=='' & dataCriacao!==null){
            const date = new Date();
            const data = {
                nome:       nomeDesempenho,
                date:       `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                alunoId:    dataParams?.studantId,
                turma:      dataParams?.turma,
                professor:  dataParams?.professorId,
            }

            createEvaluetion(data)
            setCreatePerformace(false);
        } else {
            toastMessage(false, 'Preencha corretamente os campos')
    }
    }
    function handleBack(){
        setCreatePerformace(false);
    }

    return (
        <View>
            <TextHeader>{"Criação de desempenho: "}</TextHeader>
  
            <Input 
                onChangeText={setNomeDesempenho}
                value={nomeDesempenho}
                placeholder={"Nome do desempenho"}
            />
            <Input 
                value={dataCriacao}
                editable={false}
  
            />


            <DoubleButtonConfirmation handleBack={handleBack} handleConfirm={handleSubmit} ></DoubleButtonConfirmation>
        </View>
    ) 
}

function FormCreateParams({selectEvaluation, setSelectEvaluation}){
    const [createParams, setCreateParams] = useState(false);
    const [typeParams, setTypeParams] = useState([]);
    const [textNewParam, setTextNewParam] = useState('');
    const [paramSelected, setParamSelected] = useState('');
    const [listParams, setListParams] = useState([]);
    const [valor, setValor] = useState(0)

    useEffect(()=>{
        getTypesParams(setTypeParams);
        getParams(setListParams);
        
    },[createParams])

    function handleSubmit(){
        let param = listParams.filter(filter => filter?.NomeParametro === paramSelected);
        
        if (paramSelected!=='' & param.length===1){
            param = param[0];

            const data = {
                desempenho: selectEvaluation,
                parametro: param?.id,
                valor: valor,
            }

            criarParametroDesempenho(data);
            setSelectEvaluation();
        }
    }

    function onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                
                newText = newText + text[i];
                if (newText[0]==='0' && newText.length===2){
                    newText = newText[1]
                }
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        if (text < 11)
            setValor(newText);
    }

    function handleCreateParam(){
        if (!createParams){
            setCreateParams(value=>!value);
            return;
        }

        let param  = typeParams.filter(filter => filter.Tipo == paramSelected)
            param = param[0];

        const data = {
            parametro:textNewParam,
            tipoparametroid:param.id,
        }

        criarNovoParametro(data)
        setCreateParams(value=>!value);
       

    }

    return(
        <View>
            <TextHeader>{"Criação de parâmetro:"}</TextHeader>
            <AlingDropDown>

                {!createParams ? (
                    <>
                        <SelectDropdown 
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            defaultButtonText={'Selecione parâmetro'}
                            data={listParams.map((value)=>value?.NomeParametro)}
                            onSelect={(selectedItem, index) => {
                                setParamSelected(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                            
                                return selectedItem
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />

                        <Input 
                            keyboardType='numeric'
                            onChangeText={(text)=>onChanged(text)}
                            value={valor+""}
                            maxLength={2}  //setting limit of input
                        />
                    </>
                ):(
                    <>
                        <Input  
                            onChangeText={(text)=>setTextNewParam(text)}
                            value={textNewParam} 
                            placeholder={`Digite o nome do novo paramâtro`} 
                        />
                        <SelectDropdown 
                            buttonStyle={styles.dropdown2BtnStyle}
                            buttonTextStyle={styles.dropdown2BtnTxtStyle}
                            defaultButtonText={'Selecione tipo de Parametro'}
                            data={typeParams.map((value)=>value?.Tipo)}
                            onSelect={(selectedItem, index) => {
                                setParamSelected(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                            
                                return selectedItem
                            }}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                    </>
                )
                
                }

            </AlingDropDown>
                <AlingButtons>

                {!createParams && <Button handle={()=>handleSubmit()} text={"Enviar Avaliação"}/>}
                    
                    
                    <Button handle={()=>handleCreateParam()} text={"Criar Novo parâmetro"}/>
                
                </AlingButtons>
            
        </View>
    );
}

export function EvaluationStudent({navigation, route}){
    const [createPerformance, setCreatePerformace] = useState(false);
    const [selectEvaluation, setSelectEvaluation] = useState(0);
    const [dataEvaluation, setDataEvaluation] = useState([]);

    
    const { id, studantId, ProfessorId } =  route?.params;

    useEffect(()=>{
        if (!createPerformance) {
            const data = {professor:ProfessorId, aluno:studantId}
        
            getEvaluetion(data, setDataEvaluation);
        }



    },[createPerformance])
    useEffect(()=>{
 

    },[dataEvaluation])


    return (
        <Container>

            {!createPerformance ? 
                <View>
                    <TextHeader>{"AVALIAÇÃO:"}</TextHeader>
                    <ContainerEvaluation>
                    <TextHeader>{"Datas de Desempenho: "}</TextHeader>
                    
                    <EvaluationList
                        data={dataEvaluation}
                        renderItem={({item, index})=> 

                            <RenderEvaluation 
                                item={item} 
                                navigation={navigation}
                                selectEvaluation={selectEvaluation}
                                setSelectEvaluation={setSelectEvaluation} 
                            />

                        }
                        keyExtractor={item => `${item?.id}`+'91'}
                    />
                    </ContainerEvaluation>
                    <AddButton handle={()=>{setCreatePerformace(value=>!value)}}></AddButton>
                    {
                        selectEvaluation!==0 &&
                            <FormCreateParams selectEvaluation={selectEvaluation} setSelectEvaluation={setSelectEvaluation}></FormCreateParams>
                    }
                </View>              
                :
                <CreatePerformace dataParams={{studantId:studantId, professorId:ProfessorId, turma:id}} setCreatePerformace={setCreatePerformace}></CreatePerformace>
            }

        </Container>
    )
}