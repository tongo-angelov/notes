import { Grid, Typography } from "@mui/material";

type HeaderProps = {
    title?: string,
    children?: JSX.Element | JSX.Element[];
};

export default function Header({ title, children }: HeaderProps) {
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
                {children}
            </Grid>
        </Grid>
    );
}