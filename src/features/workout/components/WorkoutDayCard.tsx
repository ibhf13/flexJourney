import { BaseCard, BaseCardContent } from '@/components/common/Cards'
import { WorkoutDay } from '../types/WorkoutTypes'

interface WorkoutDayCardProps {
    day: WorkoutDay
    onClick: (day: WorkoutDay) => void
    isLoading?: boolean
}

export const WorkoutDayCard = ({
    day,
    onClick,
    isLoading = false
}: WorkoutDayCardProps) => {
    const handleClick = () => {
        if (!isLoading) {
            onClick(day)
        }
    }

    return (
        <BaseCard
            title={day.title}
            imageUrl={day.imageUrl}
            imageHeight={200}
            isLoading={isLoading}
            onClick={handleClick}
        >
            <BaseCardContent
                title={day.title}
                description={day.description}
                level={day.level}
                exercisesCount={day.exercises.length}
            />
        </BaseCard>
    )
}