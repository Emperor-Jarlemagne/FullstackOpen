import React, { useReducer } from 'react'
import { NotificationContext } from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        message: action.payload,
        type: 'success'
      };
    case 'ERROR':
      return {
        message: action.payload,
        type: 'error'
      };
    default:
      return state
  }
};

const initialState = {
  message: '',
  type: ''
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}