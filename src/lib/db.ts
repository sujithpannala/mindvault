import Dexie, { type EntityTable } from 'dexie';
import type { Note, Collection } from '@/types';

const db = new Dexie('MindVaultDB') as Dexie & {
  notes: EntityTable<Note, 'id'>;
  collections: EntityTable<Collection, 'id'>;
};

db.version(1).stores({
  notes: 'id, title, collectionId, createdAt, updatedAt, *tags',
  collections: 'id, name, createdAt',
});

export { db };
