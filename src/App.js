import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import Organisations from './panels/Organisations';


import Persik from './panels/Persik';
import {PopoutWrapper} from "@vkontakte/vkui";
import Groups from "./panels/Groups";
import Main from "./panels/Main";
import Ads from "./panels/Ads";

const qs = require('querystring');

const App = () => {
	const [initialized, setInitialized] = useState(false);
	const [activePanel, setActivePanel] = useState('organisations');
	const [fetchedUser, setUser] = useState(null);

	const [organisation, setOrganisation] = useState(null);
	const [group, setGroup] = useState(null);

	const [popout, setPopout] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
		    if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
			setTimeout(() => setInitialized(true), 100);

		}
		fetchData();

		const token = 'dda1c7edde3ec0def0124836c7d03b301b9b6135c89e1b401004931ce02198b674f4e16295aea1446898b';
	}, []);

	useEffect(() => {

        let hash = window.location.hash,
            parts = hash.split('_');

        if (parts.length === 2)
        {
            getDataFromHash(parts);
            return;
        }

        bridge.send("VKWebAppStorageGet", {"keys": ["group", "organisation"]}).then(result =>
        {
            let group = null,
                organisation = null,
                panel = 'organisations';

            result.keys.forEach(keyValue =>
            {
                if (keyValue.key === 'organisation' && keyValue.value)
                {
                    organisation = JSON.parse(keyValue.value);
                }

                if (keyValue.key === 'group' && keyValue.value)
                {
                    group = JSON.parse(keyValue.value);
                }
            });

            setOrganisation(organisation);
            setGroup(group);

            if (organisation !== null)
            {
                panel = 'groups';
            }

            if (group !== null)
            {
                panel = 'main';
            }

            setActivePanel(panel);
        });
	}, []);

	function getDataFromHash (parts)
    {
        let idOrganisation = parts[0].replace('#', ''),
            nameResult = parts[1];

        fetch(`https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/organisations/${idOrganisation}/${nameResult}/data`).then(result =>
        {
            result.json().then(result =>
            {
                setOrganisation(result.data.organisation);
                setGroup(result.data.result);
                bridge.send("VKWebAppStorageSet", {key : "group", value : JSON.stringify(result.data.result)});
                bridge.send("VKWebAppStorageSet", {key : "organisation", value : JSON.stringify(result.data.organisation)});
                setActivePanel('main');
            });
        });
    }

	const selectOrganisation = organisation => {
	    setOrganisation(organisation);
		setActivePanel('groups');
        bridge.send("VKWebAppStorageSet", {key : "organisation" , value : JSON.stringify(organisation)});
	};

    const removeSelectedOrganisation = () => {
        setOrganisation(null);
        setActivePanel('organisations');
    };

    const selectGroup = group => {
        setGroup(group);
        setActivePanel('main');
        bridge.send("VKWebAppStorageSet", {key : "group", value : JSON.stringify(group)});
    };


    if (!initialized)
    {
        return <ScreenSpinner/>
    }

    function removeCache ()
    {
        setActivePanel('organisations');
        bridge.send("VKWebAppStorageSet", {key : "group", value : ''});
        bridge.send("VKWebAppStorageSet", {key : "organisation", value : ''});
    }

    function openAds ()
    {
        setActivePanel('ads');
    }

    return (
		<View activePanel={activePanel} popout={popout}>
			<Organisations id='organisations' selectOrganisation={selectOrganisation} setPopout={setPopout}/>
			<Groups id='groups' selectGroup={selectGroup} organisation={organisation} setPopout={setPopout} onBack={removeSelectedOrganisation}/>
			<Main id='main' openAds={openAds} user={fetchedUser} organisation={organisation} group={group} setPopout={setPopout} removeCache={removeCache}/>
			<Ads id='ads' onBack={() => setActivePanel('main')}/>
		</View>
	);
}

export default App;

