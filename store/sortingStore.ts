import {create} from "zustand"

interface SelectedCategory {
    selectedCategory: String;
    setSelectedCategory: (isActive: String) => void
}
interface SortBy {
    sortBy: String;
    setSortBy: (isActive: String) => void
}
interface MinPrice {
    minPrice: Number;
    setMinPrice: (isActive: Number) => void
}
interface MaxPrice {
    maxPrice: Number;
    setMaxPrice: (isActive: Number) => void
}

interface Brand {
  selectedBrand: String;
  setSelectedBrand: (isActive: String) => void
}

export const sortByState = create<SortBy>()((set) => ({
    sortBy: "name",
    setSortBy: (isActive) => set({ sortBy: isActive }),
  }))

export const selectedCategoryState = create<SelectedCategory>()((set) => ({
    selectedCategory: "All",
    setSelectedCategory: (isActive) => set({ selectedCategory: isActive }),
  }))

export const minPriceState = create<MinPrice>()((set) => ({
    minPrice: 0,
    setMinPrice: (isActive) => set({minPrice: isActive }),
  }))

export const maxPriceState = create<MaxPrice>()((set) => ({
    maxPrice: 0,
    setMaxPrice: (isActive) => set({maxPrice: isActive }),
  }))

  export const brandState = create<Brand>()((set) => ({
    selectedBrand: "All",
    setSelectedBrand: (isActive) => set({ selectedBrand: isActive }),
  }))