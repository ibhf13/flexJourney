import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigation } from '@/contexts/NavigationContext'

export const useRouteChange = () => {
  const location = useLocation()
  const { setActiveRoute, closeAllMenus } = useNavigation()

  useEffect(() => {
    setActiveRoute(location.pathname)
    closeAllMenus()
  }, [location.pathname, setActiveRoute, closeAllMenus])
}
