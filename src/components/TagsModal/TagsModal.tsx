import { useContext } from "react";

import { Box, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { AppContext } from "../../context/AppContext";
import { Tag } from "../../types";

type TagsModalProps = {
    open: boolean;
    handleClose: () => void;
};

type TagFieldProps = {
    tag: Tag;
    onUpdateTag: (id: string, title: string) => void;
    onDeleteTag: (id: string) => void;
};


export default function TagsModal({ open, handleClose }: TagsModalProps) {
    const { tags, onUpdateTag, onDeleteTag } = useContext(AppContext);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Grid container justifyContent='center'>
                <Grid item xs={12} sm={10} md={8} lg={6} >
                    <Box sx={{ margin: '25px', background: 'white', borderRadius: '5px', padding: '10px' }} >
                        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginBottom: '20px' }} align='center'>
                            Edit tags
                        </Typography>
                        <Grid id="modal-modal-description" container direction='column' spacing={2} >
                            {tags.length > 0 ? tags.map(tag =>
                                <Grid item key={tag.id}>
                                    <TagField tag={tag} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />
                                </Grid>
                            ) : <Typography align="center">No tags</Typography>}
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </Modal >
    );
}

const TagField = ({ tag, onUpdateTag, onDeleteTag }: TagFieldProps) => {
    return (
        <Grid container justifyContent='space-between' alignItems='center' >
            <Grid item xs={11}>
                <TextField defaultValue={tag.title} fullWidth onChange={(e) => onUpdateTag(tag.id, e.target.value)} />
            </Grid>
            <Grid item xs={1} textAlign='right'>
                <IconButton color="error" component="label" onClick={() => onDeleteTag(tag.id)}>
                    <DeleteForeverIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
    );
};