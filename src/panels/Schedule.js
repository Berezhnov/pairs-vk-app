import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import {
    List,
    RichCell,
    Avatar,
    Div,
    Text,
    Group,
    PanelSpinner,
    ActionSheet,
    ActionSheetItem,
    platform,
    Counter,
    PullToRefresh,
    IOS,
    FixedLayout,
    PromoBanner
} from "@vkontakte/vkui";
import IconAdd from '@vkontakte/icons/dist/28/add_outline';
import IconUsers from '@vkontakte/icons/dist/28/users';
import CreateGroupModal from "./CreateGroupModal";
import CreateNoteModal from "./CreateNoteModal";
import CreateEventModal from "./CreateEventModal";
import NoteDetailModal from "./NoteDetailModal";
import InfiniteScroll from 'react-infinite-scroller';
import EventDetailModal from "./EventDetailModal";
import bridge from '@vkontakte/vk-bridge';

const pairsColors = ['#66bb6a', '#29b6f6', '#ef5350', '#ebda58', '#999'];
const osName = platform();

let randomBanners = [
{
    title: 'Реклама от вконтакте',
    domain: 'vk.com',
    trackingLink: 'https://vk.com',
    ctaText: 'Перейти',
    advertisingLabel: 'Реклама',
    iconLink: 'https://sun9-7.userapi.com/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg',
    description: 'Нативная реклама от вк',
    ageRestriction: 14,
    statistics: [
        { url: '', type: 'playbackStarted' },
        { url: '', type: 'click' }
    ]
},
    {
        title: 'Кофе с собой! Студентам скидка!',
        domain: 'vk.com',
        trackingLink: 'https://vk.com',
        ctaText: 'Перейти',
        advertisingLabel: 'Реклама',
        iconLink: 'https://avatars.mds.yandex.net/get-pdb/1088712/0c605504-b7e3-4cad-b502-9fe0e5e7f16c/s1200?webp=false',
        description: 'Кафешка рядом с универом',
        ageRestriction: 14,
        statistics: [
            { url: '', type: 'playbackStarted' },
            { url: '', type: 'click' }
        ]
    },
    {
        title: 'Решаю задачи по математике',
        domain: 'vk.com',
        trackingLink: 'https://vk.com',
        ctaText: 'Перейти',
        advertisingLabel: 'Реклама',
        iconLink: 'https://cdn1.flamp.ru/0a8674637b2e5dd9e28ed2d104fdacfa.jpg',
        description: 'Опыт работы 100 лет..',
        ageRestriction: 14,
        statistics: [
            { url: '', type: 'playbackStarted' },
            { url: '', type: 'click' }
        ]
    }
,
    {
        title: 'Телеграм канал',
        domain: 'vk.com',
        trackingLink: 'https://vk.com',
        ctaText: 'Перейти',
        advertisingLabel: 'Реклама',
        iconLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1024px-Telegram_2019_Logo.svg.png',
        description: 'Какой-то телеграм канал',
        ageRestriction: 14,
        statistics: [
            { url: '', type: 'playbackStarted' },
            { url: '', type: 'click' }
        ]
    }


];
function Schedule ({ id, organisation, group, setPopout, user, openAds }) {


    const [lastWeek, setLastWeek] = useState(24);
    const [schedule, setSchedule] = useState([]);
    const [showBottomLoader, setShowBottomLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [day, setDay] = useState(null);
    const [lock, setLock] = useState(true);
    const [banner, setBanner] = useState(null);

    const  parseQueryString = (string) => {
        return string.slice(1).split('&')
        .map((queryParam) => {
            let kvp = queryParam.split('=');
            return {key: kvp[0], value: kvp[1]}
        })
        .reduce((query, kvp) => {
            query[kvp.key] = kvp.value;
            return query
        }, {})
    };

    useEffect(() => {
        const queryParams = parseQueryString(window.location.search);

/*
        bridge.send("VKWebAppAllowNotifications", {}).then(() =>
        {
            bridge.send("VKWebAppCallAPIMethod", {
                "method": "notifications.sendMessage",
                "params": {"user_ids": user.id, "v":"5.110",
                    "access_token":'f1e842dcf1e842dcf1e842dca4f19af29eff1e8f1e842dcaf058cdd0121e01faef9b2ab',
                    "client_secret" : "gz3usCGLAUk0lMJsUFoE",
                    "message": 'Проверьте ваше расписание на сегодня!',
                    "fragment" : '123'
                }})
            .then(res => alert(JSON.stringify(res)))
            .catch(res => alert(JSON.stringify(res)))
        })
*/

        bridge.send("VKWebAppCallAPIMethod", {
            "method": "notifications.sendMessage",
            "params": {"user_ids": user.id, "v":"5.110",
                "access_token":'f1e842dcf1e842dcf1e842dca4f19af29eff1e8f1e842dcaf058cdd0121e01faef9b2ab',
                "client_secret" : "gz3usCGLAUk0lMJsUFoE",
                "message": 'Проверьте ваше расписание на сегодня!',
                "fragment" : '123'
            }})

    }, []);

    useEffect(() =>
    {
        setLoading(true);
        refreshSchedule(true, true);
    }, [organisation, group]);

    function refreshSchedule (refresh = false, initial = false)
    {
        setTimeout(() => setLock(false), 3000);
        setLoading(!refresh || initial);
        setRefreshing(refresh);
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/schedule/' + organisation.id + '/' + encodeURIComponent(group.idResult) + '/' + (refresh ? 24 : lastWeek), {headers : {'Id' : user.id}}).then(result =>
        {
            result.json().then(result =>
            {
                setLastWeek(result.data.lastWeek);
                setSchedule(refresh ? result.data.schedule : [...schedule, ...result.data.schedule]);
                if (refresh)
                {
                    setBanner(randomBanners[Math.floor(Math.random() * randomBanners.length)]);
                }
            });
        }).finally(() => setTimeout(() => {setLoading(false); setRefreshing(false); setShowBottomLoader(false)}, 300));
    }

    function onAdd (day = null)
    {
        setDay(day);

        setPopout(
            <ActionSheet onClose={() => setPopout(null)}>
                <ActionSheetItem onClick={() => openAddNote(day)} autoclose>
                    Добавить заметку
                </ActionSheetItem>
                <ActionSheetItem onClick={() => openAddEvent(day)} autoclose>
                    Добавить событие
                </ActionSheetItem>
                {osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        );
    }

    function onCreateNote (data)
    {
        setLoading(true);
        let allData = {...data, id : user.id, label : user.first_name + ' ' + user.last_name};
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/notes/' + organisation.id + '/' + encodeURIComponent(group.idResult), {method : "POST", body : JSON.stringify(allData)}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                refreshSchedule(true);
            });
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    function onCreateEvent (data)
    {
        setLoading(true);
        let allData = {...data, id : user.id, label : user.first_name + ' ' + user.last_name};
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/events/' + organisation.id + '/' + encodeURIComponent(group.idResult), {method : "POST", body : JSON.stringify(allData)}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                refreshSchedule(true);
            });
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    function openAddNote (day)
    {
        setPopout(<CreateNoteModal day={day} onCreate={onCreateNote} onClose={() => setPopout(null)}/>);
    }

    function openAddEvent (day)
    {
        setPopout(<CreateEventModal day={day} onCreate={onCreateEvent} onClose={() => setPopout(null)}/>);
    }

    function openNote (note)
    {
        setPopout(<NoteDetailModal note={note} onDelete={() => onDeleteNote(note)} onClose={() => setPopout(null)}/>);
    }

    function openEvent (event)
    {
        setPopout(<EventDetailModal event={event} onDelete={() => onDeleteEvent(event)} onClose={() => setPopout(null)}/>);
    }

    function onDeleteNote (note)
    {
        setLoading(true);
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/notes/' + note.id, {method : "DELETE"}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                refreshSchedule(true);
            });
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    function onDeleteEvent (event)
    {
        setLoading(true);
        fetch('https://api.xn----7sbaba9cb6bk0m.xn--p1ai/hakaton/events/' + event.id, {method : "DELETE"}).then(result =>
        {
            result.json().then(result =>
            {
                setPopout(null);
                refreshSchedule(true);
            });
        }).finally(() => setTimeout(() => setLoading(false), 300));
    }


    function onLoadMore ()
    {
        if (lock || !schedule)
        {
            return;
        }

        setLock(true);
        setShowBottomLoader(true);
        refreshSchedule();
    }

    return (
        <React.Fragment>

            <PanelHeader id="schedule" right={<PanelHeaderButton ><IconAdd onClick={onAdd}/></PanelHeaderButton>}>
                {group && group.nameResult}
            </PanelHeader>

            {loading && <PanelSpinner/>}

            <PullToRefresh onRefresh={() => refreshSchedule(true)} isFetching={refreshing}>

                <InfiniteScroll
                    pageStart={0}
                    loadMore={onLoadMore}
                    hasMore={true}
                    loader={showBottomLoader ? <PanelSpinner/> : null}
                >
                    <List>
                        {
                            schedule && schedule.map((day, index) =>
                                <React.Fragment>

                                    {
                                        index === 1 && banner &&
                                        <PromoBanner style={{marginTop: -10}} bannerData={banner} />
                                    }

                                    <Group separator={index === 0 ? 'hide' : 'show'} style={{marginBottom: 10}} onDoubleClick={() => onAdd(day)}>

                                        <Text style={{color: '#777', fontSize: 12, marginLeft: 15, marginTop: 10, marginBottom: 5}}>
                                            {day.dayName + ', ' + day.formattedDate}
                                        </Text>

                                        <Text style={{marginLeft: 15, marginTop: 5, marginBottom: 5}}>{day.notes.map(note =>
                                            <Div onClick={() => openNote(note)} style={{border: '1px solid #ccc', marginRight: 10, marginTop: 10, padding : '2px 5px', borderRadius : 5, display: 'inline'}} size="s" mode="prominent">
                                                {note.isPrivate === '1' ? '' : '(гр.) '}
                                                {note.text}
                                            </Div>)}
                                        </Text>

                                        {
                                            day.events.length === 0 && day.pairs.length === 0 && <Text style={{marginLeft: 15}}>Нет занятий</Text>
                                        }
                                        {
                                            day.pairs.map((pair, pairIndex) =>
                                                <RichCell disabled
                                                          after={
                                                              <Text style={{color: '#777', fontSize: 14, marginRight: 10}}>
                                                                  {pair.time.begin} - {pair.time.end}
                                                              </Text>
                                                          }

                                                          before={

                                                              <Text style={{marginTop: 3, marginBottom: 0, marginRight: 20, marginLeft: 10}}>
                                                                  <Avatar style={{ background: pairsColors[pair.lessonInfo.number] }} size={24} shadow={false}>
                                                                      <Div style={{color : 'white'}}>{pair.pairNumber}</Div>
                                                                  </Avatar>
                                                                  <Text size={20} style={{color: '#ccc', fontSize: 12, marginLeft: 2, marginTop: 0}}>{pair.lessonInfo.name}</Text>
                                                              </Text>
                                                          }

                                                          caption={
                                                              <Text style={{ fontSize: 12, color: '#777', marginTop: 5, marginBottom : 0}}>
                                                                  {[pair.audNumber, pair.uniquePairName].filter(item => item).join(', ')}
                                                              </Text>
                                                          }
                                                          actions={
                                                              null
                                                          }
                                                          multiline
                                                >
                                                    <Text style={{marginTop: 0, fontSize: 16}}>
                                                        {pair.subjectName}
                                                    </Text>
                                                </RichCell>
                                            )
                                        }

                                        {
                                            day.events.map((event) =>
                                                <RichCell
                                                    onClick={() => openEvent(event)}
                                                          after={
                                                              <Text style={{color: '#777', fontSize: 14, marginRight: 10}}>
                                                                  {event.time1} - {event.time2}
                                                              </Text>
                                                          }

                                                          before={

                                                              <Text style={{marginTop: 3, marginBottom: 0, marginRight: 20, marginLeft: 10}}>
                                                                  <Avatar style={{ background: event.color }} size={24} shadow={false}>
                                                                      <Div style={{color : 'white'}}>{event.eventNumber}</Div>
                                                                  </Avatar>
                                                                  <Text size={20} style={{color: '#ccc', fontSize: 12, marginLeft: 2, marginTop: 0}}>{event.eventTypeName}</Text>
                                                              </Text>
                                                          }

                                                          caption={
                                                              <Text style={{ fontSize: 12, color: '#777', marginTop: 5, marginBottom : 0}}>
                                                                  {[event.addition1, event.addition2].filter(item => item).join(', ')}
                                                              </Text>
                                                          }
                                                          actions={
                                                              null
                                                          }
                                                          multiline
                                                >
                                                    <Text style={{marginTop: 0, fontSize: 16}}>
                                                        {event.text}
                                                    </Text>
                                                </RichCell>
                                            )
                                        }

                                    </Group>
                                </React.Fragment>)
                        }
                    </List>
                </InfiniteScroll>

            </PullToRefresh>

        </React.Fragment>
    )
};


export default Schedule;
