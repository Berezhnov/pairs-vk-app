import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {InfoRow, ModalCard, SimpleCell, CellButton} from "@vkontakte/vkui";
import bridge from '@vkontakte/vk-bridge';
import IconShare from '@vkontakte/icons/dist/28/share_outline';
import Icon24NarrativeActiveOutline from '@vkontakte/icons/dist/24/narrative_active_outline';
import Icon24StorefrontOutline from '@vkontakte/icons/dist/24/storefront_outline';

function Profile ({ openAds, user, organisation, group, setPopout , removeCache}) {


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

    function shareSchedule ()
    {
       /* let stringify = require('json-stable-stringify');  //  canonical json implementation
        let md5 = require('md5');
        let base64 = require('base-64');
        let sha1 = require('sha1');

        let amount = 1;
        let merch_data = {
            amount: amount,
            order_id: 0,
            currency: "RUB",
            ts: (Date.now() / 1000 | 0),
            cashback: {pay_time: (Date.now() / 1000 | 0 + 200), amount_percent: 30}
        };

        let merch_data_base64 = base64.encode(JSON.stringify(merch_data));
        let data = {
            cashback: merch_data.cashback,
            order_id: merch_data.order_id,
            ts: merch_data.ts,
            currency: "RUB",
            merchant_data: merch_data_base64,
            merchant_sign: sha1(merch_data_base64 + MERCH_PRIVATE_KEY),
            event_name: "buy_pro_event",
            your_custom_params_here: 999,
        };

        let pay_window_params = {
            amount: amount,
            data: data,
            description: "Оплата заказа",
            action: "pay-to-service",
            merchant_id: MERCH_ID,
            version: 2
        };

        let params = "";
        Object.keys(pay_window_params).sort((a, b) => a > b).forEach(
            function (key) { if (key != "action") params += key + "=" + ( key == "data"? stringify( pay_window_params[key] ) : pay_window_params[key]  ) }
        );


        pay_window_params.sign = md5(params + APP_SECRET_KET)
*/
        bridge.send("VKWebAppShowWallPostBox", {"message": `Студент ${organisation.short}? Группа - ${group.nameResult}? Твое расписание занятий уже здесь! vk.com/app7516226#${organisation.id}_${group.idResult}`});
        //bridge.send("VKWebAppShare", {"link": `https://vk.com/7516226#${organisation.id}_${group.idResult}`});
    }

    function buyPro ()
    {
        const params = {
            "amount": 1.5,
            "data": {
                "currency": "RUB",
                "merchant_data": "eyJvcmRlcl9pZCI6IjI1NTMxIiwidHMiOiIxNTM5MzI5NzcwIiwiYW1vdW50IjoxLjUsImN1cnJlbmN5IjoiUlVCIn0=",
                "merchant_sign": "63d5dce9d2c9d29198ba12ba3f8e270e6606a221",
                "order_id": "25531",
                "ts": "1539329770"
            },
            "description": "Test Payment",
            "action": "pay-to-service",
            "merchant_id": 617001,
            "version": 2,
            "sign": "818964335a550e39d9a1dd0d752e60ab"
        };
        bridge.send("VKWebAppOpenPayForm", {"app_id": '516226', "action": "pay-to-service", "params": params});
    }

	return (
        <React.Fragment>
            <PanelHeader>Профиль</PanelHeader>

            {user &&
            <Group title="User Data Fetched with VK Bridge">
                <Cell
                    before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
                    description={user.city && user.city.title ? user.city.title : ''}
                >
                    {`${user.first_name} ${user.last_name}`}
                </Cell>

                <SimpleCell multiline>
                    <InfoRow header="Учебное заведение">
                        {organisation.short}
                    </InfoRow>
                </SimpleCell>

                <SimpleCell multiline>
                    <InfoRow header="Учебная группа">
                        {group.nameResult}
                    </InfoRow>
                </SimpleCell>

                <CellButton mode="danger" onClick={removeCache}>Сбрость настройки</CellButton>

            </Group>}

            <Group title="Navigation Example">
                <Div>
                    <Button before={<Icon24NarrativeActiveOutline/>} onClick={buyPro} size="xl" level="2" data-to="persik">
                        Перейти PRO-версию без рекламы
                    </Button>
                </Div>
                <Div>
                    <Button before={<Icon24StorefrontOutline/>} onClick={() => openAds()} size="xl" level="2" data-to="persik">
                        Заказать рекламу
                    </Button>
                </Div>
                <Div>
                    <Button before={<IconShare/>} onClick={shareSchedule} size="xl" level="2" data-to="persik">
                        Поделиться расписанием
                    </Button>
                </Div>
            </Group>

        </React.Fragment>
    )
};


export default Profile;
