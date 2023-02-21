import { createContext } from "react";

import { v4 as uuidv4 } from 'uuid';

import { RawNote, SimpleNote, Tag } from "../types";
import useStorage from "../useStorage";

type ContextType = {
    notes: RawNote[],
    onCreateNote: (note: SimpleNote) => void,
    onUpdateNote: (id: string, note: SimpleNote) => void,
    onDeleteNote: (id: string) => void,
    tags: Tag[],
    onCreateTag: (title: string) => Tag,
    onUpdateTag: (id: string, title: string) => void,
    onDeleteTag: (id: string) => void;
};

export const AppContext = createContext<ContextType>({
    notes: [],
    onCreateNote: () => { },
    onUpdateNote: () => { },
    onDeleteNote: () => { },
    tags: [],
    onCreateTag: () => { return { id: '', title: '' }; },
    onUpdateTag: () => { },
    onDeleteTag: () => { },
});

type AppContextProviderProps = {
    children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [notes, setNotes] = useStorage('notes', []);
    const [tags, setTags] = useStorage('tags', []);

    const onCreateNote = (note: SimpleNote) => {
        setNotes((notes: RawNote[]) => [...notes, { id: uuidv4(), title: note.title, body: note.body, tagsId: note.tags.map(tag => tag.id) }]);
    };

    const onUpdateNote = (id: string, note: SimpleNote) => {
        setNotes((notes: RawNote[]) => notes.map((n: RawNote) => {
            if (n.id !== id)
                return n;
            return { ...n, title: note.title, body: note.body, tagsId: note.tags.map(tag => tag.id) };
        }));
    };

    const onDeleteNote = (id: string) => {
        setNotes((notes: RawNote[]) => notes.filter((n: RawNote) => n.id !== id));
    };

    const onCreateTag = (title: string): Tag => {
        const newTag: Tag = { id: uuidv4(), title };
        setTags((tags: Tag[]) => [...tags, newTag]);
        return newTag;
    };

    const onUpdateTag = (id: string, title: string) => {
        setTags((tags: Tag[]) => tags.map((t: Tag) => {
            if (t.id !== id)
                return t;
            return { ...t, title };
        }));
    };

    const onDeleteTag = (id: string) => {
        setTags((tags: Tag[]) => tags.filter((tag: Tag) => tag.id !== id));
    };

    const context = {
        notes,
        onCreateNote,
        onUpdateNote,
        onDeleteNote,
        tags,
        onCreateTag,
        onUpdateTag,
        onDeleteTag
    };

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};