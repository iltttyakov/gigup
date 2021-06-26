import React from 'react'
import Avatar from "../ui/Avatar/Avatar"
import Profile from "../ui/Profile/Profile"
import Video from "../ui/Video/Video"
import Button from "../ui/Button/Button"

const UserProfile = ({user}) => {
    return (
        <>
            <Profile.Header>
                <Profile.AvatarArea>
                    <Avatar src={user.avatar}/>
                </Profile.AvatarArea>
                <Profile.Name
                    name={user.full_name}
                    status={user.status}
                    status_display={user.status_display}
                    customStatus={user.custom_status}
                />
            </Profile.Header>
            <Profile.ControlsArea>
                <Button type={'link'} to={'/search'} rock={true}>Поиск музыкантов</Button>
            </Profile.ControlsArea>
            {/*<Profile.List>*/}
            {/*    <Profile.Item>Телефон: <a href={`tel:${user.phone}`}>{user.phone}</a></Profile.Item>*/}
            {/*    <Profile.Item>Город: {user.location || 'Не выбран'}</Profile.Item>*/}
            {/*    <Profile.Item>Возраст: {user.age || 'Не выбран'}</Profile.Item>*/}
            {/*    <Profile.Item>Инструмент: {user.instrument ? user.instrument.name : 'Не выбран'}</Profile.Item>*/}
            {/*    <Profile.Item>Жанр: {user.genre ? user.genre.name : 'Не выбран'}</Profile.Item>*/}
            {/*    <Profile.Item>Уровень игры: {user.skill_level} из 10</Profile.Item>*/}
            {/*    <Profile.Item>*/}
            {/*        <Profile.SocialList>*/}
            {/*            <Profile.SocialItem socialName={'whatsapp'} data={user.phone}/>*/}
            {/*            {user.telegram*/}
            {/*                ? <Profile.SocialItem socialName={'telegram'} data={user.telegram}/>*/}
            {/*                : null*/}
            {/*            }*/}
            {/*            {user.vk*/}
            {/*                ? <Profile.SocialItem socialName={'vk'} data={user.vk}/>*/}
            {/*                : null*/}
            {/*            }*/}
            {/*            {user.instagram*/}
            {/*                ? <Profile.SocialItem socialName={'instagram'} data={user.instagram}/>*/}
            {/*                : null*/}
            {/*            }*/}
            {/*        </Profile.SocialList>*/}
            {/*    </Profile.Item>*/}
            {/*</Profile.List>*/}
            {
                user.youtube_ids
                    ? <Profile.VideoArea>
                        <Video.Row>
                            {
                                user.youtube_ids
                                    .split(',')
                                    .map((videoId, index) => <Video.Item key={index} videoId={videoId}/>)
                            }
                        </Video.Row>
                    </Profile.VideoArea>
                    : null
            }
        </>
    )
}

export default UserProfile