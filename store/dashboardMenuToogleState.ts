import {create} from "zustand"

interface DashboardMenuToogleState{
    navbarOpen: boolean;
    setNavbarOpen: (isActive: boolean) => void

}

export const dashboardMenuToogleState = create<DashboardMenuToogleState>()((set) => ({
    navbarOpen: false,
    setNavbarOpen: (isActive) => set({ navbarOpen: isActive }),
  }))