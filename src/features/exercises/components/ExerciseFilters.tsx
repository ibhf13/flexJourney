import { LoadingErrorWrapper } from '@/components/common/Error/LoadingErrorWrapper'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useCategories } from '../hooks/useCategories'

interface ExerciseFiltersProps {
    searchQuery: string
    selectedCategory: string
    onSearchChange: (query: string) => void
    onCategoryChange: (category: string) => void
}

export const ExerciseFilters = ({
    searchQuery,
    selectedCategory,
    onSearchChange,
    onCategoryChange
}: ExerciseFiltersProps) => {
    const { categories, isLoading, error } = useCategories()

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
                size="small"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{ width: 200 }}
            />
            <LoadingErrorWrapper isLoading={isLoading} error={error}>
                <FormControl size="small" sx={{ width: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </LoadingErrorWrapper>
        </Box>
    )
}