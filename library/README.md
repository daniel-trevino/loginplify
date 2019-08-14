## Getting Started

### Installation

```
$ npm i loginplify
```

## Add authentication on a page on your React application

```js
import * as React from 'react'
import { withAuthenticator } from 'loginplify'

const settings = {
  endpoint: 'https://loginservice.mydomain.se/graphql'
}

const ProtectedPage = () => {
  return (
    <div>
      <h1>This is private content</h1>
    </div>
  )
}

export default withAuthenticator(ProtectedPage, settings)
```

## Logout

```js
import * as React from 'react'
import { withAuthenticator, useLoginServiceContext } from 'loginplify'

const settings = {
  endpoint: 'https://loginservice.mydomain.se/graphql'
}

const ProtectedPage = () => {
  const { actions } = useLoginServiceContext()

  return (
    <div>
      <h1>This is private content</h1>
      <button onClick={() => actions.logout()}>Logout</button>
    </div>
  )
}

export default withAuthenticator(ProtectedPage, settings)
```
