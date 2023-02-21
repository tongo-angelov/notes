import { useContext } from "react";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { Note, RawNote, Tag } from "../types";


export default function NoteLayout() {
    const { notes, tags } = useContext(AppContext);

    const { id } = useParams();

    const fullNotes: Note[] = notes.map((note: RawNote) => { return { ...note, tags: tags.filter((tag: Tag) => note.tagsId.includes(tag.id)) }; });

    const note = fullNotes.find(n => n.id === id);
    if (note == null) return <Navigate to="/" replace />;
    return <Outlet context={note} />;
}

export function useNote() {
    return useOutletContext<Note>();
}
