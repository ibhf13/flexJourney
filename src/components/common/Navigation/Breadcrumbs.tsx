import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { BreadcrumbsProps } from './types'

const Breadcrumbs = ({
  items,
  maxItems = 8,
  separator = <NavigateNextIcon fontSize="small" />,
  className,
}: BreadcrumbsProps) => {

  return (
    <MuiBreadcrumbs
      separator={separator}
      maxItems={maxItems}
      aria-label="breadcrumb navigation"
      className={className}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        const content = (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.icon && (
              <Box component="span" sx={{ mr: 0.5, display: 'flex' }}>
                {item.icon}
              </Box>
            )}
            {item.label}
          </Box>
        )

        if (isLast) {
          return (
            <Typography key={item.label} color="text.primary" aria-current="page">
              {content}
            </Typography>
          )
        }

        return item.path ? (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.path}
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {content}
          </Link>
        ) : (
          <Typography key={item.label} color="text.secondary">
            {content}
          </Typography>
        )
      })}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
