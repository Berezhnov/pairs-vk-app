import React, {useState} from 'react';

import './Persik.css';
import {ModalCard, ModalRoot, SimpleCell, InfoRow} from "@vkontakte/vkui";

function NoteDetailModal ({note, onDelete, onClose}) {


	return (
        <ModalRoot
            activeModal={'detail-note'}
            onClose={onClose}
        >
            <ModalCard
                id={'detail-note'}
                onClose={onClose}
                header="Заметка"
                actions={[
                    {
                        title: 'Удалить',
                        mode: 'danger',
                        action: () => onDelete()
                    }
                ]}
            >
                <SimpleCell multiline>
                    <InfoRow header="Текст заметки">
                        {note.text}
                    </InfoRow>
                </SimpleCell>

                <SimpleCell multiline>
                    <InfoRow header="Автор">
                        {note.label}
                    </InfoRow>
                </SimpleCell>

                <SimpleCell multiline>
                    <InfoRow header="Тип заметки">
                        {note.isPrivate === '1' ? 'Личная заметка' : 'Групповая заметка'}
                    </InfoRow>
                </SimpleCell>

            </ModalCard>

        </ModalRoot>
    );
};


export default NoteDetailModal;
