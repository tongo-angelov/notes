import { useContext } from "react";

import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { AppThemeContext } from "../../context/AppThemeContext";

type HeaderProps = {
    title?: string,
    children?: JSX.Element | JSX.Element[];
};

export default function Header({ title, children }: HeaderProps) {
    const theme = useTheme();
    const themeContext = useContext(AppThemeContext);
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="end"
            marginBottom='20px'>
            <Grid
                item
                xs={children ? 4 : 12}>
                <Typography
                    variant="h5"
                    textAlign='start'>
                    {title ?? ''}
                </Typography>
            </Grid>
            <Grid
                item
                xs={8}
                display="flex"
                justifyContent="flex-end"
                gap="10px">
                <IconButton sx={{ ml: 1 }} onClick={themeContext.toggleTheme} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {children}
            </Grid>
        </Grid>
    );
}