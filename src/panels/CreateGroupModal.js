import React, {useState} from 'react';

import './Persik.css';
import {ModalCard, ModalRoot, Input} from "@vkontakte/vkui";

function CreateGroupModal ({onCreate, onClose}) {

    const [text, setText] = useState('');

	return (
        <ModalRoot
            activeModal={'create-group'}
            onClose={onClose}
        >
            <ModalCard
                id={'create-group'}
                onClose={onClose}
                header="Новая учебная группа"
                caption="Введите название новой учебной групыы."
                actions={[
                    {
                        title: 'Добавить',
                        mode: 'primary',
                        action: () => onCreate(text)
                    }
                ]}
            >
                <Input value={text} placeholder="Например, 8А или БПО-19-01" onChange={e => setText(e.target.value)}/>
            </ModalCard>

        </ModalRoot>
    );
};


export default CreateGroupModal;
