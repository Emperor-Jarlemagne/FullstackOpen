import React, { useContext } from 'react'
import {NotificationContext} from '../NotificationContext'

const Notification = () => {
  const { notification, dispatch } = useContext(NotificationContext)

  if (notification === null) {
    return null
  }

  const { text, type } = notification

  return (
    <div className={type === "error" ? "error" : "notification"}>
      {text}
    </div>
  )
}
export default Notification
