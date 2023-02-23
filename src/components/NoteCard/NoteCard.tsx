import { useNavigate } from "react-router-dom";
import { Box, Chip, Paper, Typography } from "@mui/material";

import { Tag } from "../../types";
import './NoteCard.css';

type NoteCardProps = {
    id: string,
    title: string,
    tags: Tag[];
};

export default function NoteCard({ id, title, tags }: NoteCardProps) {
    const navigate = useNavigate();

    return (
        <Paper
            className='card'>
            <Box
                sx={{
                    height: '20vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
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
        </Paper>
    );
}