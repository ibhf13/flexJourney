import { 
  ContainerProps as MuiContainerProps,
  PaperProps as MuiPaperProps,
  CardProps as MuiCardProps,
  BoxProps,
  Theme
} from '@mui/material';
import { SxProps } from '@mui/system';

export interface ContainerProps extends MuiContainerProps {
  centerContent?: boolean;
}

export interface PaperProps extends MuiPaperProps {
  elevation?: number;
}

export interface CardProps extends MuiCardProps {
  headerTitle?: string;
  headerAction?: React.ReactNode;
  media?: {
    src: string;
    alt: string;
    height?: number | string;
  };
  cardStyles?: SxProps<Theme>;
}

export interface GridContainerProps extends BoxProps {
  spacing?: number;
  columns?: number;
  children: React.ReactNode;
}

export interface GridItemProps extends BoxProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}