import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { Box, IconButton, Tooltip } from '@mui/material'

interface ViewToggleProps {
    isGridView: boolean
    onViewChange: (isGrid: boolean) => void
}

export const ViewToggle = ({ isGridView, onViewChange }: ViewToggleProps) => {
    return (
        <Box>
            <Tooltip title="Grid View">
                <IconButton
                    color={isGridView ? 'primary' : 'default'}
                    onClick={() => onViewChange(true)}
                >
                    <GridViewIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="List View">
                <IconButton
                    color={!isGridView ? 'primary' : 'default'}
                    onClick={() => onViewChange(false)}
                >
                    <ViewListIcon />
                </IconButton>
            </Tooltip>
        </Box>
    )
}