import {create} from "zustand"

interface Notification {
    notificationMessage: string;
    setNotificationMessage: (isActive: string) => void

}

export const notificationMessage = create<Notification>()((set) => ({
    notificationMessage: "",
    setNotificationMessage: (isActive) => set({ notificationMessage: isActive }),
  }))