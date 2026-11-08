export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  collectionId?: string;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  color?: string;
  createdAt: number;
}
