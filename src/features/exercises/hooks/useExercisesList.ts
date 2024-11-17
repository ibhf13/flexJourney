import { useState } from 'react'
import { Exercise } from '../types/ExerciseTypes'
import { useExercises } from './useExercises'

const ITEMS_PER_PAGE = 12

export const useExercisesList = () => {
    const [isGridView, setIsGridView] = useState(true)
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

    const { exercises, categories } = useExercises()

    const filteredExercises = exercises.data?.filter(exercise => {
        const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || exercise.category === selectedCategory

        return matchesSearch && matchesCategory
    }) ?? []

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

    return {
        // Data
        exercises: paginatedExercises,
        categories: categories.data,
        selectedExercise,

        // Loading and error states
        isLoading: exercises.isLoading || categories.isLoading,
        error: exercises.error || categories.error,

        // Pagination
        page,
        totalPages,
        setPage,

        // View controls
        isGridView,
        setIsGridView,

        // Filters
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,

        // Modal controls
        handleExerciseSelect,
        handleCloseModal,
    }
}