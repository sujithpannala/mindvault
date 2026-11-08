import { create } from 'zustand';
import { db } from './db';
import type { Note, Collection } from '@/types';

interface MindVaultState {
  notes: Note[];
  collections: Collection[];
  searchQuery: string;
  selectedCollectionId: string | null;
  isLoading: boolean;
  
  loadNotes: () => Promise<void>;
  loadCollections: () => Promise<void>;
  createNote: (title: string, content?: string) => Promise<Note>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCollectionId: (id: string | null) => void;
  createCollection: (name: string) => Promise<Collection>;
}

export const useMindVaultStore = create<MindVaultState>((set, get) => ({
  notes: [],
  collections: [],
  searchQuery: '',
  selectedCollectionId: null,
  isLoading: false,

  loadNotes: async () => {
    set({ isLoading: true });
    try {
      const notes = await db.notes.orderBy('updatedAt').reverse().toArray();
      set({ notes, isLoading: false });
    } catch (error) {
      console.error('Failed to load notes:', error);
      set({ isLoading: false });
    }
  },

  loadCollections: async () => {
    try {
      const collections = await db.collections.orderBy('name').toArray();
      set({ collections });
    } catch (error) {
      console.error('Failed to load collections:', error);
    }
  },

  createNote: async (title: string, content = '') => {
    const now = Date.now();
    const note: Note = {
      id: crypto.randomUUID(),
      title: title || 'Untitled',
      content,
      tags: [],
      createdAt: now,
      updatedAt: now,
    };
    await db.notes.add(note);
    set((state) => ({ notes: [note, ...state.notes] }));
    return note;
  },

  updateNote: async (id: string, updates: Partial<Note>) => {
    const updatedAt = Date.now();
    await db.notes.update(id, { ...updates, updatedAt });
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt } : n
      ),
    }));
  },

  deleteNote: async (id: string) => {
    await db.notes.delete(id);
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedCollectionId: (id: string | null) => set({ selectedCollectionId: id }),

  createCollection: async (name: string) => {
    const collection: Collection = {
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
    };
    await db.collections.add(collection);
    set((state) => ({
      collections: [...state.collections, collection].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
    return collection;
  },
}));
