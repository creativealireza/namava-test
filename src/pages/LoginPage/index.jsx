import React, { useState } from 'react'
import ShowEye from '../../components/ShowEye/index.jsx'
import HideEye from '../../components/HideEye/index.jsx'
import Toast from '../../components/Toast/index.jsx'
import postUserCredential from '../../services/postUserCredential.js'
import translateToFarsi from '../../constants/fa.js'
import emailValidation from '../../utils/emailValidation.js'
import { Player } from '@lottiefiles/react-lottie-player'
import loading from './loading.json'
import './style.css'

export default function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hideEye, setHideEye] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('error')

  function inputChangeHandler (e) {
    if (e.target.type === 'email') setEmail(e.target.value)
    else setPassword(e.target.value)
  }

  function loginBtnClickHandler (e) {
    e.preventDefault()
    if (formCheck()) {
      setIsLoading(true)
      authentication()
    }
  }

  function inputKeyDownHandler (e) {
    if (e.key === 'Enter' && email && password) {
      if (formCheck()) {
        setIsLoading(true)
        authentication()
      }
    }
  }

  function formCheck () {
    if (emailValidation(email)) return true
    else {
      toastMessage('error', translateToFarsi['1001'])
      return false
    }
  }

  function toastMessage (status, title) {
    setStatus(status)
    setToastTitle(title)
    setTimeout(() => {
      setToastTitle('')
    }, 3000)
  }

  async function authentication () {
    const result = await postUserCredential({ email, password })
    // const { succeeded } = result

    setIsLoading(false)

    if (result?.succeeded) toastMessage('success', translateToFarsi['1005'])
    else toastMessage('error', `${translateToFarsi[result?.error?.code] || 'خطای عمومی'}`)
  }

  return (
    <div className='login-page'>
      <section className='header'>
        <a href='https://www.namava.ir/home'>
          <img src='./assets/images/namava-logo.svg' alt='namava-logo' className='namava-logo' />
        </a>
        <a href='https://www.namava.ir/auth/register-phone' className='sign-up-url'>
          <span className='sign-up-title'>ثبت نام</span>
        </a>
      </section>
      <section className='login-box'>
        <div className='login-header'>
          <div className='title'>ورود از طریق ایمیل</div>
          <div className='subtitle'>لطفا ایمیل و رمز عبور خود را وارد کنید.</div>
        </div>
        <div className='email-section'>
          <p className='email-prefix'>{email && 'ایمیل'}</p>
          <div className='email-wrapper'>
            <div className='email-box'>
              <input
                type='email'
                name='email-input'
                id='email-input'
                className={`email-input ${email && 'input-direction'}`}
                placeholder='ایمیل'
                onChange={inputChangeHandler}
                onKeyDown={inputKeyDownHandler}
              />
            </div>
          </div>
        </div>
        <div className='password-section'>
          <p className='password-prefix'>{password && 'رمز عبور'}</p>
          <div className='password-wrapper'>
            <div className='password-box'>
              <input
                type={`${password && hideEye ? 'text' : 'password'}`}
                name='password-input'
                value={password}
                id='password-input'
                className={`password-input ${password && 'input-direction'}`}
                placeholder='رمز عبور'
                onChange={inputChangeHandler}
                onKeyDown={inputKeyDownHandler}
              />
              {password &&
                (hideEye ?
                  <HideEye onClick={() => setHideEye(he => !he)} /> :
                  <ShowEye onClick={() => setHideEye(he => !he)} />
                )}
            </div>
          </div>
        </div>
        <button
          type='submit'
          className={'submit-login'}
          onClick={(e) => loginBtnClickHandler(e)}
          disabled={!password || !email}
        >
          {isLoading ? <Player autoplay loop src={loading} style={{ height: '24px', width: '24px' }} /> : 'ورود'}
        </button>
        <a href='https://www.namava.ir/auth/recover-email' className='forgot-password'>
          <span>رمز عبور خود را فراموش کرده‌ام</span>
        </a>
        <a href='https://www.namava.ir/auth/login-phone' className='login-phone'>
          <span>ورود از طریق شماره تلفن همراه</span>
        </a>
      </section>
      <Toast title={toastTitle} status={status} />
    </div>
  )
}

