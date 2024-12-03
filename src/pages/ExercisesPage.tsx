import { useAuthContext } from '@/features/auth/contexts/AuthContext'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import { AdminExerciseDialog } from '@/features/exercises/components/AdminExerciseDialog'
import { ExerciseCard } from '@/features/exercises/components/ExerciseCard'
import { ExerciseDialog } from '@/features/exercises/components/ExerciseDialog'
import { ExerciseFilters } from '@/features/exercises/components/ExerciseFilters'
import { ExerciseListItem } from '@/features/exercises/components/ExerciseListItem'
import { ViewToggle } from '@/features/exercises/components/ViewToggle'
import { useExercisesList } from '@/features/exercises/hooks/useExercisesList'
import { Exercise } from '@/features/exercises/types/ExerciseTypes'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Container, Grid, List, Pagination, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'

const ExercisesPage = () => {
    const { user } = useAuthContext()
    const isAdmin = user?.email === 'iebo@example.com'
    const {
        exercises,
        isExercisesLoading,
        exercisesError,
        page,
        totalPages,
        setPage,
        isGridView,
        setIsGridView,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        selectedExercise,
        handleExerciseSelect,
        handleCloseModal,
    } = useExercisesList()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedExerciseForEdit, setSelectedExerciseForEdit] = useState<Exercise | null>(null)

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false)
    }

    const handleExerciseEdit = (exercise: Exercise) => {
        setSelectedExerciseForEdit(exercise)
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 2, sm: 4 },
                px: { xs: 1, sm: 3 },
                overflow: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}
        >
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 4 } }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexShrink: 0
                    }}>
                        <ViewToggle
                            isGridView={isGridView}
                            onViewChange={setIsGridView}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenCreateModal}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Add Exercise
                        </Button>
                    </Box>
                    <ExerciseFilters
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        onSearchChange={setSearchQuery}
                        onCategoryChange={setSelectedCategory}
                        isMobile={isMobile}
                    />
                </Box>

                <LoadingErrorWrapper isLoading={isExercisesLoading} error={exercisesError}>
                    {isGridView ? (
                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            {exercises.map(exercise => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={`grid-${exercise.id}`}>
                                    <ExerciseCard
                                        exercise={exercise}
                                        onEdit={handleExerciseEdit}
                                        onView={handleExerciseSelect}
                                        isAdmin={isAdmin}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <List sx={{
                            width: '100%',
                            '& .MuiListItem-root': { px: { xs: 1, sm: 2 } }
                        }}>
                            {exercises.map(exercise => (
                                <ExerciseListItem
                                    key={`list-${exercise.id}`}
                                    exercise={exercise}
                                    onSelect={handleExerciseSelect}
                                />
                            ))}
                        </List>
                    )}

                    {totalPages > 1 && (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: { xs: 2, sm: 4 }
                        }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                                size={isMobile ? 'small' : 'medium'}
                                siblingCount={isMobile ? 0 : 1}
                            />
                        </Box>
                    )}
                </LoadingErrorWrapper>
            </Paper>
            {selectedExercise && (
                <ExerciseDialog
                    exercise={selectedExercise}
                    open={!!selectedExercise}
                    onClose={handleCloseModal}
                />
            )}
            {selectedExerciseForEdit && (
                <AdminExerciseDialog
                    exercise={selectedExerciseForEdit}
                    open={!!selectedExerciseForEdit}
                    onClose={() => setSelectedExerciseForEdit(null)}
                    mode="edit"
                />
            )}
            <AdminExerciseDialog
                exercise={null}
                open={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                mode="create"
            />
        </Container>
    )
}

export default ExercisesPage
