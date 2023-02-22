import { useNavigate } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";

import { Tag } from "../../types";

type NoteCardProps = {
    id: string,
    title: string,
    tags: Tag[];
};

export default function NoteCard({ id, title, tags }: NoteCardProps) {
    const navigate = useNavigate();

    return (
        <Box sx={{
            height: '20vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            borderRadius: '5px',
            padding: '5px',
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'grey.400',
        }}
            onClick={() => navigate(`/${id}`)}>
            <Typography variant='h5'>{title}</Typography>
            {tags.length > 0 &&
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '5px' }}>
                    {tags.map(tag => <Chip
                        key={tag.title}
                        label={tag.title}
                        color='primary' />)}
                </Box>}
        </Box>
    );
}