import React, { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

import { useFindMessagesQuery, useSendMessageMutation } from './api';
import { useGetMeQuery } from 'features/user/api';
import DisplayName from 'features/user/displayName';

interface IProps {
    roomID: string;
};

type Form = {
    message: string;
};

function MessageList(props: IProps) {
    const {data: messages} = useFindMessagesQuery(props.roomID);
    const {data: loggedInUser} = useGetMeQuery();
    const [sendMessage] = useSendMessageMutation();
    const {register, handleSubmit, reset} = useForm<Form>();

    const bottomMessageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomMessageContainerRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    const onSubmit: SubmitHandler<Form> = async data => {
        await sendMessage({
            roomID: props.roomID,
            detail: data.message,
        }).unwrap();

        reset();
    };

    return (
        <form className="relative flex flex-col w-full h-full" onSubmit={handleSubmit(onSubmit)}>
            <div  className="flex-auto flex flex-col overflow-auto">
                <div className="flex flex-col mt-auto">
                    {messages && messages.map(message => ((
                        <div key={message.id} className={`w-2/3 p-2 ${loggedInUser?.id === message.userID? "ml-auto": ""}`}>
                            <div className={`${loggedInUser?.id === message.userID? "text-blue-600": ""}`}>
                                <DisplayName id={message.userID}/>
                            </div>

                            <div className="p-2 rounded-lg shadow-inner-lg dark:shadow-white/10">{message.detail}</div>
                        </div>
                    )))}
                </div>

                <div ref={bottomMessageContainerRef}/>
            </div>
            
            
            <div className="flex">
                <div className="flex-auto rounded-xl shadow-inner-lg dark:shadow-white/10">
                    <input
                    type="text"
                    className="w-full border-0 bg-transparent focus:ring-0"
                    autoComplete="off"
                    {...register("message", {required: true})}/>
                </div>
                
                <button type="submit" className="w-10 h-10 p-2">
                    <PaperAirplaneIcon className="w-full h-full"/>
                </button>                
            </div>
        </form>
    );
}

export default MessageList;