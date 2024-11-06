import { Box, Tabs as MuiTabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { CustomTabsProps, TabPanelProps } from './types'

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  )
}

const Tabs = ({
  items,
  value,
  onChange,
  variant = 'standard',
  orientation = 'horizontal',
  showIcons = false,
  centered = false,
  ...props
}: CustomTabsProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const mobileVariant = isMobile ? 'scrollable' : variant

  const handleChange = (_: React.SyntheticEvent, newValue: string | number) => {
    onChange(newValue)
  }

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      variant={mobileVariant}
      orientation={orientation}
      centered={centered && !isMobile}
      scrollButtons={isMobile ? 'auto' : false}
      allowScrollButtonsMobile
      aria-label="navigation tabs"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        minHeight: orientation === 'vertical' ? 300 : 'auto',
        ...(orientation === 'vertical' && {
          borderRight: 1,
          borderBottom: 0,
          '& .MuiTabs-indicator': {
            left: 0,
          },
        }),
      }}
      {...props}
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          label={item.label}
          value={item.value}
          icon={showIcons ? item.icon : undefined}
          iconPosition="start"
          disabled={item.disabled}
          component={item.path ? Link : 'div'}
          to={item.path || ''}
          sx={{
            minHeight: 48,
            textTransform: 'none',
            ...(orientation === 'vertical' && {
              alignItems: 'flex-start',
            }),
          }}
        />
      ))}
    </MuiTabs>
  )
}

export default Tabs
