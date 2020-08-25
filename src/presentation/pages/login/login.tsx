import React from 'react'

import { Spinner } from '@/presentation/components'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTIwcHgiIGhlaWdodD0iODdweCIgdmlld0JveD0iMCAwIDEyMCA4NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTMuMiAoNzI2NDMpIC0gaHR0cHM6Ly9za2V0Y2hhcHAuY29tIC0tPgogICAgPHRpdGxlPkdyb3VwIENvcHk8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTG9naW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NTIuMDAwMDAwLCAtNzkuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ1Mi4wMDAwMDAsIDc5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ2LjQ2NDY0NjUsLTIuMTMxNjI4MjFlLTE0IEw3OC4wNjE3Mzg2LC0yLjEzMTYyODIxZS0xNCBDMTAzLjkwMzAwNCwtMi4xMzE2MjgyMWUtMTQgMTE5LjE5MTkxOSwxNS43MTIyMTU3IDExOS4xOTE5MTksNDMuMjIzNjQzMiBDMTE5LjE5MTkxOSw3MC43MzUwNzA3IDEwMy45NjI5Niw4Ni44Njg2ODY5IDc4LjA2MTczODYsODYuODY4Njg2OSBMNDYuNDY0NjQ2NSw4Ni44Njg2ODY5IEw0Ni40NjQ2NDY1LC0yLjEzMTYyODIxZS0xNCBaIE02MS45MzM0MzE2LDEzLjEyMzYxMzEgTDYxLjkzMzQzMTYsNzMuNzQ1MDczNyBMNzYuNDQyOTEyMiw3My43NDUwNzM3IEM5My44MzAzMDY0LDczLjc0NTA3MzcgMTAzLjQyMzM1MSw2My4wODk2NjMxIDEwMy40MjMzNTEsNDMuMjgzODQzMyBDMTAzLjQyMzM1MSwyMy44MzkyMjM4IDkzLjcxMDM5MzMsMTMuMTIzNjEzMSA3Ni40NDI5MTIyLDEzLjEyMzYxMzEgTDYxLjkzMzQzMTYsMTMuMTIzNjEzMSBaIiBpZD0iRCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQ1LjE0MTA2NTgsODYuODY4Njg2OSBMNDUuMTQxMDY1OCw3MC40MzQwNzA0IEwwLDcwLjQzNDA3MDQgTDAsNTcuMDY5NjU3MSBDNy44MzY5OTA2LDQyLjg2MjQ0MjkgMTcuOTMxMDM0NSwyNy4zOTEwMjc0IDM3LjU1NDg1ODksLTIuMTMxNjI4MjFlLTE0IEw2MC41NjQyNjMzLC0yLjEzMTYyODIxZS0xNCBMNjAuNTY0MjYzMyw1Ny43MzE4NTc3IEw3Mi43MjcyNzI3LDU3LjczMTg1NzcgTDcyLjcyNzI3MjcsNzAuNDM0MDcwNCBMNjAuNTY0MjYzMyw3MC40MzQwNzA0IEw2MC41NjQyNjMzLDg2Ljg2ODY4NjkgTDQ1LjE0MTA2NTgsODYuODY4Njg2OSBaIE0xNC42NzA4NDY0LDU3LjY3MTY1NzcgTDE0LjY3MDg0NjQsNTguMDkzMDU4MSBMNDUuMzkxODQ5NSw1OC4wOTMwNTgxIEw0NS4zOTE4NDk1LDExLjQ5ODIxMTUgTDQ1LjE0MTA2NTgsMTEuNDk4MjExNSBDMzAuNTMyOTE1NCwzMS44NDU4MzE4IDIxLjg4MDg3NzcsNDQuNjY4NDQ0NyAxNC42NzA4NDY0LDU3LjY3MTY1NzcgWiIgaWQ9IjQiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="Logo"/>
        <h1>4Dev - Survey for Programmers</h1>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="E-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Password" />
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type="submit">Sign In</button>
        <span className={Styles.link}>Create an account</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>
            Error
          </span>
        </div>
      </form>

      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
