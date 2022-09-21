import { AnyAction, Dispatch, isRejectedWithValue, ThunkDispatch } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

import { addMessage } from 'features/messages/slice'

const rtkQueryMiddleware: Middleware<{}, any, Dispatch<AnyAction> & ThunkDispatch<any, undefined, AnyAction>> = api => next => action => {
    if (isRejectedWithValue(action)) {
        const details: string[] = []

        if (action.payload.data) {
            if (action.payload.data.errors) {
                for (let error of action.payload.data.errors) {
                    details.push(error)
                }
            } else {
                details.push(action.payload.data.detail)
            }
        } else {
            details.push("something went wrong")
        }
        
        for (let detail of details) {    
            api.dispatch(
                addMessage({
                    type: "ERROR", 
                    detail: detail
                })
            );
        }
    }

    return next(action)
}

export default rtkQueryMiddleware