import { AlertTitle, Alert as MuiAlert } from '@mui/material'
import { AlertProps } from '../types/types'

const Alert = ({
  severity = 'info',
  title,
  children,
  ...props
}: AlertProps & { title?: string }) => {
  return (
    <MuiAlert severity={severity} elevation={6} variant="filled" {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  )
}

export default Alert
