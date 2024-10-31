import { GlobalStyles as GlobalStylesMUI } from '@mui/material';

const GlobalStyles = GlobalStylesMUI({
    styles: {
        '*': { boxSizing: 'border-box' },
        body: { margin: 0, padding: 0, fontFamily: 'Roboto, Arial, sans-serif' },
    }
});

export default GlobalStyles;
