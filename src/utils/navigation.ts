import { useNavigationContext } from '@/contexts/NavigationContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useRouteChange = () => {
  const location = useLocation()
  const { setActiveRoute, closeAllMenus } = useNavigationContext()

  useEffect(() => {
    setActiveRoute(location.pathname)
    closeAllMenus()
  }, [location.pathname, setActiveRoute, closeAllMenus])
}
