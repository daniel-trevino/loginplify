import * as React from 'react'

interface IProps {
  msg: string
}

const AccountVerified = (props: IProps) => <div>Verified {props.msg}</div>

export default AccountVerified
