// material
import { Paper, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

// ----------------------------------------------------------------------

export interface SearchNotFoundProps {
    searchQuery?: string;
    sx?: SxProps;
}

export default function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundProps) {
    return (
        <Paper {...other}>
            <Typography gutterBottom align="center" variant="subtitle1">
                Not found
            </Typography>
            <Typography variant="body2" align="center">
                No results found for &nbsp;
                <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
            </Typography>
        </Paper>
    );
}
