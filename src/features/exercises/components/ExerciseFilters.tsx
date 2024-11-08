import { Box, FormControl, MenuItem, Select, TextField } from '@mui/material'
import { useCategories } from '../hooks/useCategories'

interface ExerciseFiltersProps {
    searchQuery: string
    selectedCategory: string
    onSearchChange: (query: string) => void
    onCategoryChange: (category: string) => void
    isMobile?: boolean
}

export const ExerciseFilters = ({
    searchQuery,
    selectedCategory,
    onSearchChange,
    onCategoryChange,
    isMobile
}: ExerciseFiltersProps) => {
    const { categories, isLoading, error } = useCategories()

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: { xs: 1, sm: 2 },
            flexShrink: 1,
            minWidth: 0, // Allow shrinking below content size
        }}>
            <TextField
                size={isMobile ? "small" : "medium"}
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{
                    minWidth: { xs: '120px', sm: '200px' },
                    '& .MuiInputBase-input': {
                        py: { xs: 1, sm: 1.5 },
                    }
                }}
            />
            <FormControl
                size={isMobile ? "small" : "medium"}
                sx={{
                    minWidth: { xs: '100px', sm: '150px' }
                }}
            >
                <Select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map(category => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}