import React, {useState} from 'react';

import './Persik.css';
import {ModalCard, ModalRoot, SimpleCell, InfoRow} from "@vkontakte/vkui";

function EventDetailModal ({event, onDelete, onClose}) {


	return (
        <ModalRoot
            activeModal={'detail-event'}
            onClose={onClose}
        >
            <ModalCard
                id={'detail-event'}
                onClose={onClose}
                header="Событие"
                actions={[
                    {
                        title: 'Удалить',
                        mode: 'danger',
                        action: () => onDelete()
                    }
                ]}
            >
                <SimpleCell multiline>
                    <InfoRow header="Текст события">
                        {event.text}
                    </InfoRow>
                </SimpleCell>

                <SimpleCell multiline>
                    <InfoRow header="Тип события">
                        {event.isPrivate === '1' ? 'Личная заметка' : 'Групповая заметка'}
                    </InfoRow>
                </SimpleCell>

            </ModalCard>

        </ModalRoot>
    );
};


export default EventDetailModal;
