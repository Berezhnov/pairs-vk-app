import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import IconAdd from '@vkontakte/icons/dist/28/add_outline';
import {IOS, List, Search, View, PanelSpinner, Group, Footer, Epic, Tabbar, TabbarItem} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import CreateGroupModal from "./CreateGroupModal";
import { platform } from '@vkontakte/vkui';
import IconSchedule from '@vkontakte/icons/dist/24/newsfeed';
import IconNote from '@vkontakte/icons/dist/24/note';
import IconUser from '@vkontakte/icons/dist/24/user';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import searchImage from '../img/search.png';
import Notes from "./Notes";
import Schedule from "./Schedule";
import Profile from "./Profile";


const osName = platform();


function Main ({ id, organisation, group, setPopout, user,removeCache, openAds }) {

    const [schedule, setSchedule] = useState('');
    const [activeStory, setActiveStory] = useState('schedule');

/*
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
*/

	return (
        <Panel id={id}>

            <Epic activeStory={activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={e => setActiveStory(e.currentTarget.dataset.story)}
                        selected={activeStory === 'notes'}
                        data-story="notes"
                        text="Заметки"
                    ><IconNote /></TabbarItem>
                    <TabbarItem
                        onClick={e => setActiveStory(e.currentTarget.dataset.story)}
                        selected={activeStory === 'schedule'}
                        data-story="schedule"
                        text="Расписание"
                    ><IconSchedule /></TabbarItem>
                    <TabbarItem
                        onClick={e => setActiveStory(e.currentTarget.dataset.story)}
                        selected={activeStory === 'profile'}
                        data-story="profile"
                        text="Профиль"
                    ><IconUser /></TabbarItem>
                </Tabbar>
            }>
                <View id="notes" activePanel="notes">
                    <Panel id="notes">
                        <Notes user={user} organisation={organisation} group={group} setPopout={setPopout}/>
                    </Panel>
                </View>
                <View id="schedule" activePanel="schedule">
                    <Panel id="schedule">
                        <Schedule user={user} organisation={organisation} group={group} setPopout={setPopout}/>
                    </Panel>
                </View>
                <View id="profile" activePanel="profile">
                    <Panel id="profile">
                        <Profile openAds={openAds} user={user} organisation={organisation} group={group} removeCache={removeCache}/>
                    </Panel>
                </View>
            </Epic>

        </Panel>
    )
};


export default Main;
