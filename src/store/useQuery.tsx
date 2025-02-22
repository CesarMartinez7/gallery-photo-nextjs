
import { create } from 'zustand'


type Estado = {
  query: string,
  count: number
}


interface Actions {
  change: (query: Estado["query"]) => void
  increment : (count: Estado["count"]) => void
}

export const useQuery = create<Estado & Actions>()((set) => ({
  query: "",
  count: 1,
  increment : (count) => set(() => ({count: count})),
  change: (query) => set(() => ({query: query}))
}) )
