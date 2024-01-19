import { create } from "zustand"

interface State {
    updates: () => void
}

export const useProductsUpdateWatch = create<State>((set) => ({
	updates: () => { }
}))