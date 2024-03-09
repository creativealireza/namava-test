import React, { useEffect, useState } from 'react'
import './styles.css'

export default function Toast({ title, status }) {
  const [toastTitle, setToastTitle] = useState('')

  useEffect(() => {
    if (title) setToastTitle(title)
  }, [title])

  return (
    <span className={`toast ${title && 'active'} ${status === 'success' && 'success'}`}>
      {status === 'error' && <img src='./assets/images/warning.svg' alt='warning' className='toast-warning' />}
      <span className='toast-title'>{toastTitle}</span>
    </span>
  )
}
