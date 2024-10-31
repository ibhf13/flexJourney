export interface NavigationState {
    isMobileMenuOpen: boolean;
    isProfileMenuOpen: boolean;
    isWorkoutDrawerOpen: boolean;
    activeRoute: string;
    isSidebarOpen: boolean;
}

export interface NavigationContextType extends NavigationState {
    toggleMobileMenu: () => void;
    toggleProfileMenu: () => void;
    toggleWorkoutDrawer: () => void;
    setActiveRoute: (route: string) => void;
    closeAllMenus: () => void;
    toggleSidebar: () => void;
}