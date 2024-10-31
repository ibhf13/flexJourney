import { Paper as MuiPaper } from '@mui/material';
import { PaperProps } from './types';

const Paper = ({
  children,
  elevation = 1,
  sx,
  ...props
}: PaperProps) => {
  return (
    <MuiPaper
      elevation={elevation}
      sx={{
        p: 3,
        ...sx
      }}
      {...props}
    >
      {children}
    </MuiPaper>
  );
};

export default Paper;