import * as React from 'react'
import { UserProvider } from '../context/UserContext'
import { SettingsProvider } from '../context/SettingsContext'
import LoginController from '../LoginController'
import { ISettingsState } from '../interfaces/Settings.interface'

function withAuthenticator(Wrapped: any, settings: ISettingsState) {
  return (props: any) => {
    return (
      <SettingsProvider settings={settings}>
        <UserProvider>
          <LoginController>
            <Wrapped />
          </LoginController>
        </UserProvider>
      </SettingsProvider>
    )
  }
}

export default withAuthenticator
