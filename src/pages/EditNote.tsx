import { useContext } from "react";

import { Container } from "@mui/material";

import { AppContext } from "../context/AppContext";
import { useNote } from "./NoteLayout";
import NoteForm from "../components/NoteForm/NoteForm";

export default function EditNote() {
    const { onUpdateNote, tags, onCreateTag } = useContext(AppContext);
    const note = useNote();

    return (
        <Container>
            <NoteForm title="Edit note" note={note} onSubmit={data => onUpdateNote(note.id, data)} tags={tags} onCreateTag={onCreateTag} />
        </Container>

    );
}