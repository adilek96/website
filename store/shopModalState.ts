import {create} from "zustand"

interface ShopModal {
    shopModal: boolean;
    setShopModal: (isActive: boolean) => void

}

export const shopModalState = create<ShopModal>()((set) => ({
    shopModal: false,
    setShopModal: (isActive) => set({ shopModal: isActive }),
  }))