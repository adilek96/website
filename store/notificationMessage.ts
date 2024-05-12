import {create} from "zustand"

interface Notification {
    notification: string;
    setNotificationMessage: (isActive: string) => void

}

export const notificationMessage = create<Notification>()((set) => ({
    notification: "",
    setNotificationMessage: (isActive) => set({ notification: isActive }),
  }))