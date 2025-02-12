// store/useStore.ts
import { create } from 'zustand'


type Estado = {
  query: string
}


interface Actions {
  change: (query: Estado["query"]) => void 
}

export const useQuery = create<Estado & Actions>()((set) => ({
  query: "",
  change: (query) => set(() => ({query: query}))
}) )
