import { Grid } from "@mui/material";

type InputContainerProps = {
    textField: JSX.Element,
    selectField: JSX.Element,
};

export default function InputContainer({ textField, selectField }: InputContainerProps) {
    return (
        <Grid
            container
            spacing={2}
            marginBottom='20px'>
            <Grid
                item
                xs={12}
                md={6}>
                {textField}
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                alignItems="stretch">
                {selectField}
            </Grid>
        </Grid>
    );
}