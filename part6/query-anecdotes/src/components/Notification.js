import React, { useContext } from 'react'
import { NotificationContext } from '../actions/NotificationContext'

const Notification = () => {
  const { state } = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!state.message) return null

  return (
    <div style={{ ...style, backgroundColor: state.type === 'success' ? 'lightgreen' : 'lightcoral' }}>
    {state.message}
    </div>
  )
}

export default Notification
