import React, { createContext, useReducer } from 'react'

//Define the intial state for notifications
const initialState = null

//create the notification reducer
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}
//Create the notification context
export const NotificationContext = createContext()

//Create the notification context provider component
export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, initialState)
    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}