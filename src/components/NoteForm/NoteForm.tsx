import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Box, Button, styled, TextField, useTheme } from "@mui/material";
import CreatableReactSelect from "react-select/creatable";

import { Note, SimpleNote, Tag } from "../../types";
import InputContainer from "../InputContainer/InputContainer";
import Header from "../Header/Header";

type NoteFormProps = {
    title: string,
    note?: Note,
    onSubmit: (note: SimpleNote) => void,
    onCreateTag: (title: string) => Tag,
    tags: Tag[],
};

export default function NoteForm({ title, note, onSubmit, onCreateTag, tags }: NoteFormProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>(note?.tags ?? []);
    const [titleError, setTitleError] = useState(false);

    const navigate = useNavigate();

    const theme = useTheme();

    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const _title = titleRef.current!.value.trim();

        if (!_title) {
            setTitleError(true);
            titleRef.current?.focus();
            return;
        }

        onSubmit({ title: _title, body: bodyRef.current!.value.trim(), tags: selectedTags });
        navigate('..', { replace: true });
    };

    return (
        <Box>
            <Header title={title}>
                <Button variant="outlined" onClick={() => navigate('..')}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </Header>

            <InputContainer textField={
                <TextField
                    error={titleError}
                    inputRef={titleRef}
                    sx={{ borderRadius: '5px' }}
                    fullWidth
                    label="Title"
                    variant="outlined"
                    defaultValue={note?.title} />
            }
                selectField={
                    <CreatableReactSelect
                        placeholder="Add tags"
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
                            option: (baseStyles, state) => ({
                                ...baseStyles,
                                backgroundColor: state.isFocused ?
                                    (theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200]) :
                                    theme.palette.background.default
                            }),
                        }}
                        onCreateOption={title => {
                            const tag: Tag = onCreateTag(title);
                            setSelectedTags(selected => [...selected, tag]);
                        }}
                        value={selectedTags.map(tag => {
                            return { label: tag.title, value: tag.id };
                        })}
                        options={tags.map(tag => {
                            return { label: tag.title, value: tag.id };
                        })}
                        onChange={tags => {
                            setSelectedTags(
                                tags.map(tag => {
                                    return { title: tag.label, id: tag.value };
                                })
                            );
                        }}
                        isMulti
                    />
                } />

            <TextField
                inputRef={bodyRef}
                sx={{ borderRadius: '5px' }}
                fullWidth
                label="Body"
                variant="outlined"
                // rows={10}
                multiline
                defaultValue={note?.body} />

        </Box >
    );
}