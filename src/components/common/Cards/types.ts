import { SxProps, Theme } from "@mui/material"
import { ReactNode } from "react"


export interface BaseCardProps {
    title: string
    imageUrl?: string
    imageHeight?: number
    isLoading?: boolean
    onClick?: () => void
    children?: ReactNode
    actionButton?: ReactNode
    sx?: SxProps<Theme>
}

export interface CardSkeletonProps {
    height?: number
}

export interface BaseCardContentProps {
    title: string
    description: string
    level: string
    exercisesCount?: number
    children?: ReactNode
    category?: string
}

export interface MediaWithSkeletonProps {
    height: number
    imageUrl: string
    mediaStyles?: SxProps<Theme>
}