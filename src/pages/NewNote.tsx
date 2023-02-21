import { useContext } from "react";

import { Container } from "@mui/material";

import { AppContext } from "../context/AppContext";
import NoteForm from "../components/NoteForm/NoteForm";

export default function NewNote() {
    const { onCreateNote, tags, onCreateTag } = useContext(AppContext);

    return (
        <Container>
            <NoteForm title='New note' onSubmit={onCreateNote} tags={tags} onCreateTag={onCreateTag} />
        </Container>
    );
}