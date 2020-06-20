import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {ModalCard, ModalRoot, Group, List, SimpleCell, InfoRow, Text} from "@vkontakte/vkui";
import IconUsers from '@vkontakte/icons/dist/28/users';
import IconHide from '@vkontakte/icons/dist/28/hide_outline';
import NoteDetailModal from "./NoteDetailModal";

function Notes ({ user, id, organisation, group, setPopout, defaultSchedule }) {


    const [notes, setNotes] = useState([]);

    useEffect(() =>
    {
        refresh();
    }, [organisation, group]);

    function refresh ()
    {
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/notes/' + organisation.id + '/' + encodeURIComponent(group.idResult), {headers : {'Id' : user.id}}).then(result =>
        {
            result.json().then(result =>
            {
                setNotes(result.data);
            });
        });

    }

    function openNote (note)
    {
        setPopout(<NoteDetailModal note={note} onDelete={() => onDeleteNote(note)} onClose={() => setPopout(null)}/>);
    }

    function onDeleteNote (note)
    {
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/notes/' + note.id, {method : "DELETE"}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                refresh();
            });
        });
    }

	return (
        <React.Fragment>
            <PanelHeader>Заметки</PanelHeader>
            <Group>
                <List>
                    {notes.map(note =>

                        <SimpleCell multiline onClick={() => openNote(note)} after={<Text style={{fontSize: 12, color: "#999"}}>{note.date}</Text>}
                                    before={note.isPrivate === '1' ? <IconHide/>: <IconUsers />}>
                            {note.text}<br/>
                            <Text style={{fontSize: 12, color: "#999"}}>{note.label}</Text>
                        </SimpleCell>
                    )}
                </List>
            </Group>
        </React.Fragment>
    )
};


export default Notes;
