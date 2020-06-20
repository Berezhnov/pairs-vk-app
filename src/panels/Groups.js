import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import IconAdd from '@vkontakte/icons/dist/28/add_outline';
import {IOS, List, Search, View, PanelSpinner, Group, Footer, Placeholder, Text} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import CreateGroupModal from "./CreateGroupModal";
import { platform } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import IconSearch from '@vkontakte/icons/dist/28/search';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import searchImage from '../img/search.png';


const osName = platform();


function Groups ({ id, selectGroup, onBack, setPopout, organisation }) {

    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState([]);

    const createGroupModal = <CreateGroupModal onCreate={onCreate} onClose={() => setPopout(null)}/>;

    function onCreateModalOpen ()
    {
        setPopout(createGroupModal);
    }

    function onCreate (text)
    {
        if (text === '')
        {
            return;
        }

        fetch(`https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/organisations/${organisation.id}/groups`, {method : "POST", body : JSON.stringify({name : text})}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                setGroups([result.data, ...groups]);
            });
        });

    }

    useEffect(() =>
    {
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/organisations/' + organisation.id + '/' + encodeURIComponent(search)).then(result =>
        {
            result.json().then(result =>
            {
                setGroups(result.data);
            });
        });
    }, [search]);

	return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={onBack}>
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
                right={<PanelHeaderButton onClick={onCreateModalOpen}><IconAdd /></PanelHeaderButton>}
                separator={false}>Выберите учебную группу
            </PanelHeader>

            <Search value={search} onChange={e => setSearch(e.target.value)}/>

            <List>
                {
                    groups.map((group, index) =>
                        <Cell
                            onClick={() => selectGroup(group)}
                            expandable
                            description={group.department}
                        >
                            {group.nameResult}
                        </Cell>)
                }
            </List>

            {groups.length === 0 &&
            <Placeholder
                icon={<IconSearch />}
                header=""
            >
                <Text style={{fontSize: 12}}>
                    Выберите вашу учебную группу. <br/>Если её не получается найти - добавьте её самостоятельно.
                </Text>
            </Placeholder>}

        </Panel>
    )
};


export default Groups;
