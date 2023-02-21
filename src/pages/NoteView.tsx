import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

import { AppContext } from "../context/AppContext";
import { useNote } from "./NoteLayout";
import Header from "../components/Header/Header";

export default function NoteView() {
    const { onDeleteNote } = useContext(AppContext);

    const [openPrompt, setOpenPrompt] = useState(false);

    const note = useNote();

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpenPrompt(true);
    };

    const handleClose = () => {
        setOpenPrompt(false);
    };

    const handleTagClick = (id: string) => {
        navigate(`/?tag=${id}`);
    };

    return (
        <Container sx={{ textAlign: 'left' }}>
            <Header>
                <Button
                    variant="outlined"
                    onClick={() => navigate('..')}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleClickOpen}>
                    Delete
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/${note.id}/edit`)}>
                    Edit
                </Button>
            </Header>
            <Typography
                variant="h5"
                textAlign='start'
                marginBottom='10px'>
                {note.title}
            </Typography>
            {(note.tags.length > 0) ? note.tags.map(tag =>
                <Chip
                    key={tag.title}
                    label={tag.title}
                    color='primary'
                    style={{ marginRight: '2px' }}
                    onClick={() => handleTagClick(tag.id)} />
            ) : <></>}
            <ReactMarkdown>{note.body}</ReactMarkdown>
            <Dialog
                open={openPrompt}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this note?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => onDeleteNote(note.id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}