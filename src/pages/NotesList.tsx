import { ChangeEvent, useContext, useMemo, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography, useTheme } from "@mui/material";
import ReactSelect, { MultiValue } from "react-select";

import { AppContext } from "../context/AppContext";
import { Note, RawNote, Tag } from "../types";
import NoteCard from "../components/NoteCard/NoteCard";
import Header from "../components/Header/Header";
import InputContainer from "../components/InputContainer/InputContainer";
import TagsModal from "../components/TagsModal/TagsModal";

export default function NotesList() {
    const { notes, tags } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const [title, setTitle] = useState(searchParams.get('title') ?? '');
    const [openModal, setOpenModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags.filter(tag => searchParams.getAll('tag').includes(tag.id)) ?? []);

    const navigate = useNavigate();

    const theme = useTheme();

    const fullNotes: Note[] = notes.map((note: RawNote) => {
        return { ...note, tags: tags.filter((tag: Tag) => note.tagsId.includes(tag.id)) };
    });

    const filteredNotes = useMemo(() => {
        return fullNotes.filter(note => (note.title.toLocaleLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
                selectedTags.every(tag =>
                    note.tags.some(noteTag => noteTag.id === tag.id)
                )));
    }, [notes, tags, title, selectedTags]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (e.target.value !== '')
            setSearchParams({ title: e.target.value, tag: selectedTags.map(tag => tag.id) });
        else
            setSearchParams({ tag: selectedTags.map(tag => tag.id) });
    };

    const handleTags = (_tags: MultiValue<{ label: string; value: string; }>) => {
        setSelectedTags(
            _tags.map(tag => {
                return { title: tag.label, id: tag.value };
            })
        );
        if (title !== '')
            setSearchParams({ title: title, tag: _tags.map(tag => tag.value) });
        else
            setSearchParams({ tag: _tags.map(tag => tag.value) });
    };

    return (
        <Container >

            <Header title="Notes">
                <Button
                    variant="outlined"
                    onClick={() => setOpenModal(true)}>
                    Edit Tags
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/new')}>
                    New Note
                </Button>
            </Header>

            <TagsModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
            />

            <InputContainer textField={
                <TextField
                    fullWidth
                    label="Filter by title"
                    variant="outlined"
                    defaultValue={title}
                    onChange={handleSearch} />
            }
                selectField={
                    <ReactSelect
                        placeholder="Filter by tag"
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                height: '100%'
                            }),
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: 'none',
                                height: '100%'
                            }),
                            placeholder: (baseStyles, state) => ({
                                ...baseStyles,
                                textAlign: 'left'
                            }),
                            menu: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: theme.palette.background.default,
                            }),
                        }}
                        value={selectedTags.map(tag => {
                            return { label: tag.title, value: tag.id };
                        })}
                        options={tags.map(tag => {
                            return { label: tag.title, value: tag.id };
                        })}
                        onChange={_tags => {
                            handleTags(_tags);
                        }}
                        isMulti

                    />
                } />

            {filteredNotes.length > 0 ?
                <Box >
                    <Grid container spacing={4}>
                        {filteredNotes.map(note => (
                            <Grid item key={note.id} xs={12} sm={6} md={4}>
                                <NoteCard id={note.id} title={note.title} tags={note.tags} />
                            </Grid>
                        ))}
                    </Grid>
                </Box> :
                <Typography variant="h4">
                    No notes found
                </Typography>
            }
        </Container>
    );

};