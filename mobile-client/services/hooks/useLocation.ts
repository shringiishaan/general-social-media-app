import { create } from "zustand"

interface UseLocation {
    location: any
    setLocation: (location: any) => void
}

export const useLocation = create<UseLocation>((set) => ({
	location: null,
	setLocation: (location: any) => set((state: UseLocation) => ({
		location: location,
	})),
}))