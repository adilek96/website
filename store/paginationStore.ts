import {create} from "zustand"

interface Pagination {
    currentPage: number;
    setCurrentPage: (isActive: number) => void

}

export const paginationState = create<Pagination>()((set) => ({
    currentPage: 1,
    setCurrentPage: (isActive) => set({currentPage: isActive }),
  }))