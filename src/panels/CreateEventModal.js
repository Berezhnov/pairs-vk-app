import React, {useState} from 'react';

import './Persik.css';
import {
    ModalCard,
    ModalRoot,
    FormLayout,
    CardGrid,
    Card,
    Div,
    FormLayoutGroup,
    Input,
    Text,
    Group,
    ModalPage,
    PanelHeaderButton,
    ModalPageHeader,
    IS_PLATFORM_ANDROID,
    IS_PLATFORM_IOS,
    Cell, Switch
} from "@vkontakte/vkui";
import IconDone from '@vkontakte/icons/dist/24/done';
import IconCancel from '@vkontakte/icons/dist/24/cancel';

function CreateEventModal ({onCreate, onClose, day}) {

    const [date, setDate] = useState(day ? day.date : '');
    const [text, setText] = useState('');
    const [addition1, setAddition1] = useState('');
    const [addition2, setAddition2] = useState('');
    const [time1, setTime1] = useState('');
    const [time2, setTime2] = useState('');
    const [eventTypeName, setEventTypeName] = useState('');
    const [eventNumber, setEventNumber] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [repeatsCount, setRepeatsCount] = useState(1);
    const [color, setColor] = useState('#AAAAAA');

    const labelStyle = {fontSize: 12, color: '#999', marginLeft: 15, marginBottom: -10 };
	return (
        <ModalRoot
            activeModal={'create-event'}
            onClose={onClose}
        >
            <ModalPage
                id={'create-event'}
                onClose={onClose}
                header={<ModalPageHeader
                    left={IS_PLATFORM_ANDROID && <PanelHeaderButton onClick={onClose}><IconCancel /></PanelHeaderButton>}
                    right={<PanelHeaderButton onClick={() => onCreate({date, text, eventNumber, addition1, addition2, time1, time2, eventTypeName, isPrivate, repeatsCount, color})}>{IS_PLATFORM_IOS ? 'Готово' : <IconDone />}</PanelHeaderButton>}
                >
                    Новое событие
                </ModalPageHeader>}
                actions={[
                    {
                        title: 'Добавить',
                        mode: 'primary',
                        action: () => onCreate({date, text, addition1, addition2, time1, time2, eventTypeName, isPrivate, repeatsCount, color})
                    }
                ]}
            >

                <FormLayout>

                    <Div style={{display: 'flex'}}>
                        <FormLayoutGroup style={{width: '33%'}}>
                            <Text style={labelStyle}>Дата события</Text>
                            <Input type="date" value={date} defaultValue={date} onChange={e => setDate(e.target.value)}/>
                        </FormLayoutGroup>

                        <FormLayoutGroup style={{width: '33%'}}>
                            <Text style={labelStyle}>Номер события</Text>
                            <Input value={eventNumber} defaultValue="1/2/3" onChange={e => setEventNumber(e.target.value)}/>
                        </FormLayoutGroup>

                        <FormLayoutGroup style={{width: '33%'}}>
                            <Text style={labelStyle}>Тип события</Text>
                            <Input value={eventTypeName} defaultValue="лек, пр" onChange={e => setEventTypeName(e.target.value)}/>
                        </FormLayoutGroup>
                    </Div>

                    <Div style={{display: 'flex', marginBottom: -35, marginTop: -35}}>
                        <FormLayoutGroup style={{width: '100%'}}>
                            <Text style={labelStyle}>Основной текст</Text>
                            <Input value={text} onChange={e => setText(e.target.value)}/>
                        </FormLayoutGroup>
                    </Div>

                    <Div style={{display: 'flex', marginBottom: -35}}>
                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Дополнение 1</Text>
                            <Input value={addition1} onChange={e => setAddition1(e.target.value)}/>
                        </FormLayoutGroup>

                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Дополнение 2</Text>
                            <Input value={addition2} onChange={e => setAddition2(e.target.value)}/>
                        </FormLayoutGroup>
                    </Div>

                    <Div style={{display: 'flex', marginBottom: -35}} >
                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Время начала</Text>
                            <Input value={time1} onChange={e => setTime1(e.target.value)}/>
                        </FormLayoutGroup>

                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Время конца</Text>
                            <Input value={time2} onChange={e => setTime2(e.target.value)}/>
                        </FormLayoutGroup>
                    </Div>

                    <Div style={{display: 'flex', marginBottom: -35}}>
                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Количество повторений</Text>
                            <Input value={repeatsCount} onChange={e => setRepeatsCount(e.target.value)}/>
                        </FormLayoutGroup>

                        <FormLayoutGroup style={{width: '50%'}}>
                            <Text style={labelStyle}>Цвет</Text>
                            <Input type="color" value={color} onChange={e => setColor(e.target.value)}/>
                        </FormLayoutGroup>
                    </Div>

                    <Div style={{display: 'flex'}}>
                        <FormLayoutGroup style={{width: '100%'}}>
                            <Cell asideContent={<Switch checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}/>}>
                                {isPrivate ? 'Личное' : 'Групповое'} событие
                            </Cell>
                            <Text style={{color: '#999', fontSize: 12, marginLeft: 10, marginTop: -15}}>{isPrivate ? 'Событие увидите только вы' :
                                <Text style={{color: '#999', fontSize: 12}}>Событие увидят все ваши одногруппники. <br/> Этот варинт подходит, если вы создаете расписание для группы</Text>}</Text>
                        </FormLayoutGroup>
                    </Div>

                </FormLayout>

            </ModalPage>

        </ModalRoot>
    );
};


export default CreateEventModal;
