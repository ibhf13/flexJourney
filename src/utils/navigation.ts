import { useNavigationContext } from '@/components/Layout/contexts/NavigationContext'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useRouteChange = () => {
  const location = useLocation()
  const { setActiveRoute, closeAllMenus } = useNavigationContext()

  // Set initial route on mount and when location changes
  useEffect(() => {
    const currentPath = location.pathname

    setActiveRoute(currentPath)
    closeAllMenus()
  }, [location.pathname, setActiveRoute, closeAllMenus])
}
