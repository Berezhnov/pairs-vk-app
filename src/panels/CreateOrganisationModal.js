import React, {useState} from 'react';

import './Persik.css';
import {Textarea, ModalCard, ModalRoot, Input} from "@vkontakte/vkui";

function CreateOrganisationModal ({onCreate, onClose}) {

    const [text, setText] = useState('');

	return (
        <ModalRoot
            activeModal={'create-organisation'}
            onClose={onClose}
        >
            <ModalCard
                id={'create-organisation'}
                onClose={onClose}
                header="Новое учебное заведение"
                caption="Введите название нового учебного заведения."
                actions={[
                    {
                        title: 'Добавить',
                        mode: 'primary',
                        action: () => onCreate(text)
                    }
                ]}
            >
                <Input value={text} placeholder="Например, ИЖГТУ" onChange={e => setText(e.target.value)}/>
            </ModalCard>

        </ModalRoot>
    );
};


export default CreateOrganisationModal;
