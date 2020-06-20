import React, {useState} from 'react';

import './Persik.css';
import {ModalCard, ModalRoot, Input, Text, Group, Switch, Cell} from "@vkontakte/vkui";

function CreateNoteModal ({onCreate, onClose, day}) {

    const [text, setText] = useState('');
    const [date, setDate] = useState(day ? day.date : '');
    const [isPrivate, setIsPrivate] = useState(false);

	return (
        <ModalRoot
            activeModal={'create-note'}
            onClose={onClose}
        >
            <ModalCard
                id={'create-note'}
                onClose={onClose}
                header="Новая заметка"
                actions={[
                    {
                        title: 'Добавить',
                        mode: 'primary',
                        action: () => onCreate({text, isPrivate, date})
                    }
                ]}
            >
                <Group>
                    <Text>Заметка для даты:</Text>
                    <Input type="date" value={date} defaultValue={date} onChange={e => setDate(e.target.value)}/>
                </Group>

                <Group>
                    <Text>Текст заметки</Text>
                    <Input value={text} placeholder="Решить домашку..." onChange={e => setText(e.target.value)}/>
                </Group>

                <Group>
                    <Cell asideContent={<Switch checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}/>}>
                        {isPrivate ? 'Личная' : 'Групповая'} заметка
                    </Cell>
                    <Text style={{color: '#999', fontSize: 12, marginLeft: 10}}>{isPrivate ? 'Заметку увидите только вы' : 'Заметку увидят все ваши одногруппники'}</Text>
                </Group>

            </ModalCard>

        </ModalRoot>
    );
};


export default CreateNoteModal;
