import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type JournalEntry = {
    id: string
    title: string
    content: string
    timestamp: number
    tags: string[]
    txHash?: string
    sentimentScore?: number
}

interface JournalState {
    entries: JournalEntry[]
    addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void
    updateEntry: (id: string, entry: Partial<JournalEntry>) => void
    deleteEntry: (id: string) => void
    getRecentEntries: (limit?: number) => JournalEntry[]
}

export const useJournalStore = create<JournalState>()(
    persist(
        (set, get) => ({
            entries: [
                // Initial Sample Data (which will be overwritten by local storage once used)
                {
                    id: '1',
                    title: 'Base migration strategy thoughts',
                    content: 'Thinking about moving the core logic to Base. The fees are much lower, and the developer experience...',
                    timestamp: Date.now() - 7200000,
                    tags: ['Engineering', 'Base'],
                    sentimentScore: 0.8
                },
                {
                    id: '2',
                    title: 'Market sentiment analysis for ETH',
                    content: 'ETH seems to be finding support at 3200. The volume is picking up on the 4h charts...',
                    timestamp: Date.now() - 18000000,
                    tags: ['Trading', 'Alpha'],
                    sentimentScore: 0.2
                }
            ],
            addEntry: (entry) => set((state) => ({
                entries: [{
                    id: Math.random().toString(36).substring(7),
                    timestamp: Date.now(),
                    ...entry
                }, ...state.entries]
            })),
            updateEntry: (id, updated) => set((state) => ({
                entries: state.entries.map(e => e.id === id ? { ...e, ...updated } : e)
            })),
            deleteEntry: (id) => set((state) => ({
                entries: state.entries.filter(e => e.id !== id)
            })),
            getRecentEntries: (limit = 3) => {
                return get().entries.slice(0, limit)
            }
        }),
        {
            name: 'dailiy-journal-storage',
        }
    )
)
