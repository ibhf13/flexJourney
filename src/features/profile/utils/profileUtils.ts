import { WeightGoalInfo } from "../types/ProfileTypes"

export const calculateBMI = (weight?: number, height?: number): number | null => {
    if (!weight || !height || height === 0) return null
    const heightInMeters = height / 100

    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'

    return 'Obese'
}

export const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return '#2196F3'
    if (bmi < 25) return '#4CAF50'
    if (bmi < 30) return '#FF9800'

    return '#F44336'
}


export const calculateWeightGoalInfo = (
    weight?: number,
    height?: number,
    targetWeight?: number
): WeightGoalInfo | null => {
    if (!weight || !height || !targetWeight) return null

    const bmi = calculateBMI(weight, height)

    if (!bmi) return null

    const heightInMeters = height / 100
    const idealWeight = Math.round(22 * (heightInMeters * heightInMeters))

    const type = bmi > 25 ? 'loss' : 'gain'

    if (!type) return null

    return {
        type,
        currentWeight: weight,
        idealWeight,
        remainingWeight: Math.abs(targetWeight - weight)
    }
}