import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    SxProps,
    Theme,
    Typography
} from '@mui/material'
import { ReactNode } from 'react'

interface StyledAccordionProps {
    expanded: boolean
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
    icon: ReactNode
    title: string
    children: ReactNode
    rightContent?: ReactNode
    detailsSx?: SxProps<Theme>
}

export const StyledAccordion = ({
    expanded,
    onChange,
    icon,
    title,
    children,
    rightContent,
    detailsSx
}: StyledAccordionProps) => (
    <Accordion
        expanded={expanded}
        onChange={onChange}
        sx={{
            borderRadius: 2,
            '&:before': { display: 'none' },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
        }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
                borderBottom: expanded ? 1 : 0,
                borderColor: 'divider',
                '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%'
                }
            }}
        >
            {icon}
            <Typography>{title}</Typography>
            {rightContent}
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3, ...detailsSx }}>
            {children}
        </AccordionDetails>
    </Accordion>
) 