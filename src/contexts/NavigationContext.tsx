import React, { createContext, useContext, useState, useCallback } from 'react';
import { NavigationState, NavigationContextType } from '@/contexts/types/navigation';

const initialState: NavigationState = {
    isMobileMenuOpen: false,
    isProfileMenuOpen: false,
    isWorkoutDrawerOpen: false,
    isSidebarOpen: false,
    activeRoute: '/',
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
    children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [state, setState] = useState<NavigationState>(initialState);

    const toggleMobileMenu = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isMobileMenuOpen: !prev.isMobileMenuOpen,
            // Close other menus when mobile menu is toggled
            isProfileMenuOpen: false,
        }));
    }, []);

    const toggleProfileMenu = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isProfileMenuOpen: !prev.isProfileMenuOpen,
            // Close other menus when profile menu is toggled
            isMobileMenuOpen: false,
        }));
    }, []);

    const toggleWorkoutDrawer = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isWorkoutDrawerOpen: !prev.isWorkoutDrawerOpen,
        }));
    }, []);

    const setActiveRoute = useCallback((route: string) => {
        setState((prev) => ({
            ...prev,
            activeRoute: route,
        }));
    }, []);

    const closeAllMenus = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isMobileMenuOpen: false,
            isProfileMenuOpen: false,
            isWorkoutDrawerOpen: false,
        }));
    }, []);

    const toggleSidebar = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isSidebarOpen: !prev.isSidebarOpen,
        }));
    }, []);

    const value = {
        ...state,
        toggleMobileMenu,
        toggleProfileMenu,
        toggleWorkoutDrawer,
        toggleSidebar,
        setActiveRoute,
        closeAllMenus,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};


export const useNavigation = () => {
    const context = useContext(NavigationContext);

    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }

    return context;
};