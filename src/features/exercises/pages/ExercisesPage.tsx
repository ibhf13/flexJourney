import { ConfirmationPopUp } from '@/components/common/Popups/ConfirmationPopUp'
import { useAuthContext } from '@/features/auth/contexts/AuthContext'
import { LoadingErrorWrapper } from '@/features/errorHandling/components/LoadingErrorWrapper'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Container, Grid, List, Pagination, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import { ExerciseCard, ExerciseFilters, ExerciseListItem, ViewToggle } from '../components'
import { ExercisesFormDialog } from '../components/Dialogs'
import { ExerciseDialog } from '../components/Dialogs/ExercisesDialog/ExerciseDialog'
import { useExercises, useExercisesQuery } from '../hooks'
import { Exercise } from '../types/ExerciseTypes'

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
    } = useExercises()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedExerciseForEdit, setSelectedExerciseForEdit] = useState<Exercise | null>(null)
    const { deleteExercise } = useExercisesQuery()
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(null)

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false)
    }

    const handleExerciseEdit = (exercise: Exercise) => {
        setSelectedExerciseForEdit(exercise)
    }

    const handleExerciseDelete = (exercise: Exercise) => {
        setExerciseToDelete(exercise)
    }

    const handleConfirmDelete = async () => {
        if (exerciseToDelete?.id) {
            try {
                await deleteExercise(exerciseToDelete.id)
                setExerciseToDelete(null)
            } catch (error) {
                console.error('Failed to delete exercise:', error)
            }
        }
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
                                <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
                                    <ExerciseCard
                                        exercise={exercise}
                                        onEdit={handleExerciseEdit}
                                        onDelete={handleExerciseDelete}
                                        onView={handleExerciseSelect}
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
                <ExercisesFormDialog
                    exercise={selectedExerciseForEdit}
                    open={!!selectedExerciseForEdit}
                    onClose={() => setSelectedExerciseForEdit(null)}
                    mode="edit"
                />
            )}
            <ExercisesFormDialog
                exercise={null}
                open={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                mode="create"
            />
            <ConfirmationPopUp
                open={!!exerciseToDelete}
                title="Delete Exercise"
                message="Are you sure you want to delete this exercise? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={() => setExerciseToDelete(null)}
                buttonText="Delete"
            />
        </Container>
    )
}

export default ExercisesPage
