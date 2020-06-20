import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import IconAdd from '@vkontakte/icons/dist/28/add_outline';
import {
    IOS,
    List,
    Search,
    File,
    View,
    Div,
    PanelSpinner,
    Group,
    Footer,
    Placeholder,
    Text,
    Input,
    FormLayout, FormLayoutGroup, ModalPage
} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import CreateGroupModal from "./CreateGroupModal";
import { platform } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import IconSearch from '@vkontakte/icons/dist/28/search';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Picture from '@vkontakte/icons/dist/28/picture_outline';
import searchImage from '../img/search.png';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StorefrontOutline from '@vkontakte/icons/dist/24/storefront_outline';

const osName = platform();

const labelStyle = {fontSize: 12, color: '#999', marginLeft: 15, marginBottom: -10 };
function Ads ({ id, selectGroup, onBack, setPopout, organisation }) {

    const [count, setCount] = useState(1000);
    const [text, setText] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [file, setFile] = useState(null);

    function submit ()
    {
        let params = {count, text, link, desc, file};
        alert(JSON.stringify(params));
    }

	return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={onBack}>
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
                separator={false}>Оформление рекламы
            </PanelHeader>

            <FormLayout>
                <Div style={{display: 'flex'}}>

                    <FormLayoutGroup style={{width: '50%'}}>
                        <Text  style={labelStyle}>Текст</Text>
                        <Input value={text} onChange={e => setText(e.target.value)} placeholder="Кофе по скидкой в CoffeeShoper!"/>
                    </FormLayoutGroup>

                    <FormLayoutGroup style={{width: '50%'}}>
                        <Text style={labelStyle}>Дополнительный текст</Text>
                        <Input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Не забудьте студенческий"/>
                    </FormLayoutGroup>
                </Div>
                <Div style={{display: 'flex'}}>

                    <FormLayoutGroup style={{width: '50%'}}>
                        <Text style={labelStyle}>Ссылка</Text>
                        <Input value={link} onChange={e => setLink(e.target.value)} placeholder="https://cofe/reclame_campaign?ref=vk-mini-apps"/>
                    </FormLayoutGroup>

                    <FormLayoutGroup style={{width: '50%'}}>
                        <Text style={labelStyle}>Изображение</Text>
                        <File value={file} onChange={e => alert(JSON.stringify(e.target.value))}  top="Загрузите ваше фото" before={<Picture />} controlSize="l">
                            Открыть галерею
                        </File>
                    </FormLayoutGroup>
                </Div>

                <Div style={{display: 'flex'}}>

                    <FormLayoutGroup style={{width: '100%'}}>
                        <Text style={labelStyle}>Количество показов</Text>
                        <Input value={count} onChange={e => setCount(e.target.value)} type="number"/>
                    </FormLayoutGroup>

                </Div>

                <Div style={{textAlign: 'center'}}>

                    <Text style={{fontSize: 60, marginBottom: 30}}>{Math.round(count * 0.03) } ₽</Text>
                    <Text style={{fontSize: 12, color: '#999'}}>Итоговая стоимость за {count} показов</Text>

                </Div>

                <Button onClick={submit} before={<Icon24StorefrontOutline/>} size="xl" level="2" data-to="persik">
                    Оплатить
                </Button>

            </FormLayout>


        </Panel>
    )
};


export default Ads;
