import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { adicionarAluno, adicionarAula, getAlunosTurma, removeAula } from "../../controler/class";
import { Loading } from "../../components/loading";
import { toastMessage } from "../../util/toastMessage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from "react-i18next";


import {
    Container,
    ContainerListColumn,
    ContainerList,
    ContentListagem,
    AddContainer,
    ContainerFlat,
    TextDescription,
    TextTouchable,
    AddContainerView,
    styles,
    ClassText,
    AdicionarAulaContainer,
    AdicionarAulaButton,
    DeleteButton,
    RenderAulaContainer,
    Equipamento,
    TextWhite,
    CancelarAula
} from "./styles";
import Divider from 'react-native-divider';

const RenderListAluno = ({ item, navigation, data }) => {
    const { t } = useTranslation()
    function handleTouch() {
        navigation.navigate(
            'StudantView',
            {
                ...data,
                studantId: item.id,
                nome: item.Nome,
                title: t("navigationHeader.StudentDescription", { name: item.Nome })
            });
    };

    return (
        <TextTouchable onPress={() => handleTouch()}>
            <Text>{item?.Nome}</Text>
        </TextTouchable>
    );
};


function AdicionarAula({ turmaId, setback }) {
    const [topicoAula, setTopicoAula] = useState('')
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [equipamentos, setEquipamentos] = useState([])
    const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false)
    const [selectTimeIsOpen, setSelectTimeIsOpen] = useState(false)
    const [equipamento, setEquipamento ] = useState('')

    function handleBack() {
        setback()
    }
    function handleSubmit() {
        if (!topicoAula) {
            toastMessage(false, 'Digite um tópico de aula');
            return
        }
        
        const data = {
            aula: topicoAula,
            data: JSON.stringify({data: date.toLocaleDateString(),hora: time.toLocaleTimeString()}),
            descricao: JSON.stringify({equipamentos}),
            turma: turmaId,
        }
        adicionarAula(data)
        setback();
    }

    useEffect(() =>{
    }, []) 
  
    return (
        <AdicionarAulaContainer>
            <TextDescription>Adicionar aula</TextDescription>
            <Input
                value={topicoAula}
                placeholder={'Tópico da aula'}
                onChangeText={setTopicoAula}
            />
            <TouchableOpacity onPress={() => {setSelectedDateIsOpen(true)}}>
                <Text>Data da aula</Text>
                <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectTimeIsOpen(true)}}>
                <Text>Horário da aula</Text>
                <Text>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
             {selectectDateIsOpen && <DateTimePicker
              themeVariant="dark"
              testID="dateTimePicker"
              value={date}
              mode="date"
              format="DD-MM-YYYY"
              minimumDate={new Date() - 1}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
               if(date) { 
                 setDate(date)
               } 
               setSelectedDateIsOpen(false)
              }}
              positiveButtonLabel="OK!" 
           />}
             {
                selectTimeIsOpen && < DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) => {
                    if(date) { 
                      setTime(date)
                    } 
                    setSelectTimeIsOpen(false)
                }}
             />
             }
            
            <Input 
                   value={equipamento}
                   placeholder={'Nome do equipamento'}
                   onChangeText={setEquipamento}
                 />
                <AdicionarAulaButton 
                 disabled={!equipamento}
                 onPress={() => {               
                    setEquipamentos(e => [...e, equipamento])
                    setEquipamento('')
                }}>
                    <TextWhite >Adicionar equipamento</TextWhite>
                </AdicionarAulaButton>
                <Text>Equipamentos da aula:</Text>
            <ScrollView style={{marginTop: 10}}>
                {equipamentos.map((equipamento, index) => <Equipamento key={index}>
                    <Text>{equipamento}</Text>
                    <DeleteButton onPress={() => {
                        const eqpm = equipamentos
                        eqpm.splice(index,1)
                        setEquipamentos([...eqpm])
                     }}>
                        <Text style={{color: 'black'}}>X</Text>
                     </DeleteButton>
                    </Equipamento>)}
            </ScrollView>
            <DoubleButtonConfirmation
                handleBack={handleBack}
                handleConfirm={handleSubmit
                }></DoubleButtonConfirmation>
        </AdicionarAulaContainer>
    )

}

function AdicionarAluno({ turmaId, setback }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState('');

    function handleBack() {
        setback()
    }
    async function handleSubmit() {
        if (mail === '' || mail.indexOf("@") === -1) {
            toastMessage(false, t("toast.error.invalid.email"));
            setback(false);
            return
        };
        setLoading(true)
        const data = {
            email: mail,
            turmaId: turmaId,
        };
        await adicionarAluno(data);
        setLoading(false)
        setback(false);
    };

    return (
        <AddContainerView>
            <Divider
                borderColor="#000"
                color="#000"
                orientation="center"
            >{t('addStudentClass.Header')}
            </Divider>
            <Input
                style={{ marginTop: 20 }}
                value={mail}
                placeholder={t("addStudentClass.Placeholder.mail")}
                keyboardType="email-address"
                onChangeText={setMail}
            />
            {
                !loading ?
                    <DoubleButtonConfirmation
                        handleBack={handleBack}
                        handleConfirm={handleSubmit
                        }
                    />
                    :
                    <Loading loading={loading} size={18} />
            }
        </AddContainerView>
    )
};



function RenderAula({aula, onDeleteAula}) {
    console.log(aula)
    return (
        <RenderAulaContainer>
             <Text>{aula.Nome}</Text>
             <CancelarAula
             onPress={() => onDeleteAula(aula.id)}>
                <TextWhite>Cancelar aula</TextWhite>
            </CancelarAula>
        </RenderAulaContainer>
    )
}

export function ClassView({ navigation, route }) {
    const { t } = useTranslation();
    const { Descricao, ProfessorId, Nome, id } = route.params.data;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [dataAulas, setDataAulas] = useState([]);
    const [page, setPage ] = useState(1) 
    const pageAddAluno = 2
    const pageAddLesson = 3 
    const pageDefault = 1 

    function handleOpenPage(pageNumber) {
        setPage(pageNumber)
    }

    function onDeleteAula(aulaID) {
       removeAula(aulaID).then(() => {
        const index = dataAulas.findIndex(e => e.id = aulaID)
        const data = dataAulas
        data.splice(index, 1)
        setDataAulas([...data])
       })
    }

    useEffect(() => {
        console.log(new Date().getHours())
        if (page === pageDefault) {
            getAlunosTurma(setDataAlunos, id);
        }
    }, []);

    return (
        <Container>
            {
                page === pageAddAluno && <AdicionarAluno setback={() => handleOpenPage(pageDefault)} turmaId={id}></AdicionarAluno>
            }
            {
                page === pageDefault &&  <ContainerListColumn>
                <ContainerList>
                    <Text>{t('classView.Student.Header')}</Text>
                    <ContainerFlat>
                        <ContentListagem
                            data={dataAlunos}
                            renderItem={
                                ({ item }) => <RenderListAluno
                                    item={item}
                                    navigation={navigation}
                                    data={
                                        { nomeTurma: Nome, id: id, ProfessorId: ProfessorId }
                                    }></RenderListAluno>}
                            keyExtractor={item => `${item.Nome}` + '91'}>
                        </ContentListagem>
                    </ContainerFlat>

                    <AddContainer>
                        <AddButton handle={() => handleOpenPage(pageAddAluno)} />
                    </AddContainer>

                </ContainerList>
                <ContainerList>
                    <AddContainer>
                        <AddButton handle={() => handleOpenPage(pageAddLesson)} />
                    </AddContainer>
                    <ClassText>Aulas:</ClassText>
                    <ContainerFlat>
                        <ContentListagem
                            data={dataAlunos}
                            renderItem={
                                ({ item }) => <RenderAula aula={item} onDeleteAula={onDeleteAula}/>
                            }
                            keyExtractor={item => item.Nome + '91'}>
                        </ContentListagem>
                    </ContainerFlat>
                </ContainerList>
            </ContainerListColumn>
       }
            {
                page === pageAddLesson && <AdicionarAula turmaId={id} setback={() => handleOpenPage(pageDefault)}/>
            }
            {/*grafico */}
        </Container>
    );
}