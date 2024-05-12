import {create} from "zustand"

interface Notification {
    notification: boolean;
    setNotification: (isActive: boolean) => void

}

export const notificationState = create<Notification>()((set) => ({
    notification: false,
    setNotification: (isActive) => set({ notification: isActive }),
  }))