import { LoadingErrorWrapper } from '@/components/common/Error/LoadingErrorWrapper'
import { ExerciseCard } from '@/features/exercises/components/ExerciseCard'
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters'
import { ExerciseListItem } from '@/features/exercises/components/ExerciseListItem'
import { ExerciseViewModal } from '@/features/exercises/components/ExerciseViewModal'
import { ViewToggle } from '@/features/exercises/components/ViewToggle'
import { useExercises } from '@/features/exercises/hooks/useExercises'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import { Box, Container, Grid, List, Pagination, Paper } from '@mui/material'
import { useState } from 'react'

const ITEMS_PER_PAGE = 12

export const ExercisesListPage = () => {
    const [isGridView, setIsGridView] = useState(true)
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

    const { exercises, isLoading, error } = useExercises()

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || exercise.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredExercises.length / ITEMS_PER_PAGE)
    const paginatedExercises = filteredExercises.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    const handleExerciseSelect = (exercise: Exercise) => {
        setSelectedExercise(exercise)
    }

    const handleCloseModal = () => {
        setSelectedExercise(null)
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <ViewToggle
                        isGridView={isGridView}
                        onViewChange={setIsGridView}
                    />
                    <ExerciseFilters
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        onSearchChange={setSearchQuery}
                        onCategoryChange={setSelectedCategory}
                    />
                </Box>

                <LoadingErrorWrapper isLoading={isLoading} error={error}>
                    {isGridView ? (
                        <Grid container spacing={3}>
                            {paginatedExercises.map(exercise => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={exercise.id}
                                >
                                    <ExerciseCard
                                        exercise={exercise}
                                        onSelect={handleExerciseSelect}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <List sx={{ width: '100%' }}>
                            {paginatedExercises.map(exercise => (
                                <ExerciseListItem
                                    key={exercise.id}
                                    exercise={exercise}
                                    onSelect={handleExerciseSelect}
                                />
                            ))}
                        </List>
                    )}

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    )}
                </LoadingErrorWrapper>
            </Paper>

            {selectedExercise && (
                <ExerciseViewModal
                    exercise={selectedExercise}
                    open={!!selectedExercise}
                    onClose={handleCloseModal}
                />
            )}
        </Container>
    )
}