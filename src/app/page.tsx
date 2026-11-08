"use client";

import { useEffect, useState } from "react";
import { useMindVaultStore } from "@/lib/store";
import type { Note } from "@/types";

export default function HomePage() {
  const {
    notes,
    searchQuery,
    isLoading,
    loadNotes,
    createNote,
    deleteNote,
    setSearchQuery,
  } = useMindVaultStore();

  const [newTitle, setNewTitle] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const filteredNotes = notes.filter((note) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q) ||
      note.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    const note = await createNote(newTitle.trim());
    setNewTitle("");
    setSelectedNote(note);
    setEditContent(note.content);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setEditContent(note.content);
  };

  const handleSaveContent = async () => {
    if (!selectedNote) return;
    await useMindVaultStore.getState().updateNote(selectedNote.id, {
      content: editContent,
    });
    setSelectedNote({ ...selectedNote, content: editContent });
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setEditContent("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-semibold tracking-tight">MindVault</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Personal Knowledge System</p>
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="p-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New note title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCreate}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {isLoading ? (
            <p className="text-sm text-zinc-500 p-3">Loading...</p>
          ) : filteredNotes.length === 0 ? (
            <p className="text-sm text-zinc-500 p-3">
              {searchQuery ? "No matching notes" : "No notes yet. Create one!"}
            </p>
          ) : (
            <ul className="space-y-1">
              {filteredNotes.map((note) => (
                <li key={note.id}>
                  <button
                    onClick={() => handleSelectNote(note)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition ${
                      selectedNote?.id === note.id
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="font-medium truncate">{note.title}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Main editor area */}
      <main className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950">
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <h2 className="text-lg font-semibold">{selectedNote.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveContent}
                  className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(selectedNote.id)}
                  className="px-3 py-1.5 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Write your note here (Markdown supported later)..."
              className="flex-1 w-full p-6 resize-none bg-transparent focus:outline-none text-base leading-relaxed"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-zinc-400">
            <div className="text-center">
              <p className="text-lg">Select a note or create a new one</p>
              <p className="text-sm mt-2">Your personal knowledge starts here</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
