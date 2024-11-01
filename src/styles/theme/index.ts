import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles'
import { palette } from './palette'
import { typography } from './typography'
import { components } from './components'

let theme = createTheme({
  palette,
  typography,
  components,
  shape: {
    borderRadius: 8,
  },
  shadows: Array(25)
    .fill('')
    .map((_, index) => {
      if (index === 0) return 'none'
      const y = index * 0.5
      const blur = index * 2
      const spread = index * 0.25
      return `0px ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${0.2 + index * 0.01})`
    }) as Theme['shadows'],
})

// Make typography responsive
theme = responsiveFontSizes(theme)

export default theme
