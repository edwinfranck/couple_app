import { database, Moment } from '@/services/database';
import { create } from 'zustand';

interface MomentsState {
    moments: Moment[];
    isLoading: boolean;
    error: string | null;

    // Actions
    loadMoments: () => Promise<void>;
    addMoment: (moment: Omit<Moment, 'id' | 'createdAt'>) => Promise<void>;
    updateMoment: (id: number, moment: Partial<Omit<Moment, 'id' | 'createdAt'>>) => Promise<void>;
    deleteMoment: (id: number) => Promise<void>;
    getMomentById: (id: number) => Moment | undefined;
}

export const useMomentsStore = create<MomentsState>((set, get) => ({
    moments: [],
    isLoading: false,
    error: null,

    loadMoments: async () => {
        set({ isLoading: true, error: null });
        try {
            const moments = await database.getAllMoments();
            set({ moments, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    addMoment: async (moment) => {
        set({ isLoading: true, error: null });
        try {
            await database.addMoment(moment);
            await get().loadMoments();
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateMoment: async (id, moment) => {
        set({ isLoading: true, error: null });
        try {
            await database.updateMoment(id, moment);
            await get().loadMoments();
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    deleteMoment: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await database.deleteMoment(id);
            await get().loadMoments();
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    getMomentById: (id) => {
        return get().moments.find((m) => m.id === id);
    },
}));
