import { Box } from '@mui/material';
import { GridContainerProps, GridItemProps } from './types';

export const GridContainer = ({
  children,
  spacing = 2,
  columns = 12,
  ...props
}: GridContainerProps) => {
  return (
    <Box
      display="grid"
      gap={spacing}
      gridTemplateColumns={{
        xs: `repeat(${columns}, 1fr)`,
        sm: `repeat(${columns}, 1fr)`,
        md: `repeat(${columns}, 1fr)`,
        lg: `repeat(${columns}, 1fr)`,
        xl: `repeat(${columns}, 1fr)`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const GridItem = ({
  children,
  xs = 12,
  sm,
  md,
  lg,
  xl,
  ...props
}: GridItemProps) => {
  return (
    <Box
      gridColumn={{
        xs: `span ${xs}`,
        sm: sm && `span ${sm}`,
        md: md && `span ${md}`,
        lg: lg && `span ${lg}`,
        xl: xl && `span ${xl}`,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};