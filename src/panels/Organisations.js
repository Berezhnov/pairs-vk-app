import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import IconLink from '@vkontakte/icons/dist/28/chain_outline';
import IconAdd from '@vkontakte/icons/dist/28/add_outline';
import {List, Search, View, Text} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import CreateOrganisationModal from "./CreateOrganisationModal";


let defaultOrganisations = [
    {id : 1, name : 'Уфимский государственный нефтяной технический университет', short : 'УГНТУ', custom : '0'},
];

function Organisations ({ id, selectOrganisation, setPopout }) {

    const [organisations, setOrganisations] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredOrganisations, setFilteredOrganisations] = useState([]);

    const createOrganisationModal = <CreateOrganisationModal onCreate={onCreate} onClose={() => setPopout(null)}/>;

    function onCreateModalOpen ()
    {
        setPopout(createOrganisationModal);
    }

    useEffect(() =>
    {
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/organisations').then(result =>
        {
            result.json().then(result =>
            {
                setOrganisations([...defaultOrganisations, ...result.data]);
            });
        });
    }, []);


    function onCreate (text)
    {
        if (text === '')
        {
            return;
        }

        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/organisations', {method : "POST", body : JSON.stringify({short : text})}).then(result =>
        {
            result.json().then(result =>
            {
                setOrganisations([...organisations, result.data]);
                setPopout(null);
            });
        });

    }

    useEffect(() =>
    {
        setFilteredOrganisations(organisations.filter(organisation => organisation.short.indexOf(search) !== -1 ||
            organisation.name.indexOf(search) !== -1));
    }, [organisations, search]);


	return (
        <Panel id={id} popout={123}>
            <PanelHeader
                right={<PanelHeaderButton onClick={onCreateModalOpen}><IconAdd /></PanelHeaderButton>}
                separator={false}>Выберите учебное заведение
            </PanelHeader>

            <Search value={search} onChange={e => setSearch(e.target.value)} after={null}/>

            <List>
                {
                    filteredOrganisations.map((organisation, index) =>
                        <Cell
                            onClick={() => selectOrganisation(organisation)}
                            before={organisation.custom !== '1' ? <IconLink /> : null}
                            expandable
                            multiline
                            description={organisation.custom === '1' ? 'Добавлено вручную' :
                                (`Подключено к системе. Раcписание формируется автоматически.`)
                            }
                        >
                            <Text>{organisation.short}</Text>
                        </Cell>)
                }
            </List>

        </Panel>
    );
};


export default Organisations;
