import { NavigationContextType, NavigationState } from '@/contexts/types/navigationType'
import React, { createContext, useCallback, useContext, useState } from 'react'

const initialState: NavigationState = {
  isMobileMenuOpen: false,
  isProfileMenuOpen: false,
  isWorkoutDrawerOpen: false,
  isSidebarOpen: true,
  activeRoute: window.location.pathname,
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NavigationState>(initialState)

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen,
    }))
  }, [])

  const toggleProfileMenu = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isProfileMenuOpen: !prev.isProfileMenuOpen,
      isMobileMenuOpen: false,
    }))
  }, [])

  const toggleWorkoutDrawer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isWorkoutDrawerOpen: !prev.isWorkoutDrawerOpen,
    }))
  }, [])

  const setActiveRoute = useCallback((route: string) => {
    setState((prev) => ({
      ...prev,
      activeRoute: route,
    }))
  }, [])

  const closeAllMenus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMobileMenuOpen: false,
      isProfileMenuOpen: false,
      isWorkoutDrawerOpen: false,
    }))
  }, [])

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSidebarOpen: !prev.isSidebarOpen,
    }))
  }, [])

  const value = {
    ...state,
    toggleMobileMenu,
    toggleProfileMenu,
    toggleWorkoutDrawer,
    toggleSidebar,
    setActiveRoute,
    closeAllMenus,
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export const useNavigationContext = () => {
  const context = useContext(NavigationContext)

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }

  return context
}
