import React, { memo, useMemo } from 'react'
import { Game, Player } from 'features/catan/api';
import ResourceCard from './resourceCard';

import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface IProps {
    game: Game;
    me?: Player;
    cancelTradeOffer: () => void;
    confirmTradeOffer: () => void;
};

function ConfirmTradeOffer(props: IProps) {
    const {t} = useTranslation("catan");

    const mySelectedResourceCards = useMemo(() => {
        return props.me?.resourceCards.filter(resourceCard => resourceCard.isSelected);
    }, [props.me])

    const activePlayerResourceCards = useMemo(() => {
        return props.game.activePlayer.resourceCards.filter(resourceCard => resourceCard.isSelected);
    }, [props.game])

    return (
        <div className="absolute flex left-0 top-0 w-full h-full bg-black/10 z-30">
            <div className="flex flex-col max-w-full m-auto p-8 rounded-md shadow-lg bg-white gap-4 dark:bg-slate-900">
                <div className="mx-auto">{t("game.started.confirm-trading-dialog.title")}</div>

                <div className="flex max-w-full mx-auto">
                    {mySelectedResourceCards?.map(resourceCard => (
                        <div key={resourceCard.id} className="flex-content min-w-4 h-24 last:flex-none">
                            <ResourceCard type={resourceCard.type}/>
                        </div>
                    ))}
                </div>

                <ArrowDownIcon className="h-12 mx-auto"/>

                <div className="flex max-w-full mx-auto">
                    {activePlayerResourceCards?.map(resourceCard => (
                        <div key={resourceCard.id} className="flex-content min-w-4 h-24 last:flex-none">
                            <ResourceCard type={resourceCard.type}/>
                        </div>
                    ))}
                </div>

                <div className="flex mx-auto gap-4">
                    <input 
                    type="button" 
                    className="px-2 py-1 rounded-md shadow-md bg-red-500 text-white cursor-pointer 
                    hover:shadow-lg hover:bg-red-400 active:shadow-md active:bg-red-500 
                    dark:bg-red-900 dark:hover:bg-red-800 dark:active:bg-red-900"
                    value={t("game.started.confirm-trading-dialog.cancel-button")}
                    onClick={() => props.cancelTradeOffer()}/>
                    
                    <input 
                    type="button" 
                    className="px-2 py-1 rounded-md shadow-md bg-green-500 text-white cursor-pointer 
                    hover:shadow-lg hover:bg-green-400 active:shadow-md active:bg-green-500 
                    dark:bg-green-900 dark:hover:bg-green-800 dark:active:bg-green-900"
                    value={t("game.started.confirm-trading-dialog.confirm-button")}
                    onClick={() => props.confirmTradeOffer()}/>
                </div>
            </div>
        </div>
    )
}

export default memo(ConfirmTradeOffer, (prevProps, nextProps) => {
    return prevProps.game === nextProps.game &&
    prevProps.me === nextProps.me;
});