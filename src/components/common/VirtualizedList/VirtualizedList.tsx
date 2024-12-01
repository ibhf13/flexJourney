import { Box } from '@mui/material'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

interface VirtualizedListProps<T> {
    items: T[]
    height: number
    itemSize: number
    renderItem: (props: { item: T; index: number }) => React.ReactNode
}

/**
 * @description Virtualized list component that renders a list of items using the react-virtual library.
 * @param items - The list of items to render.
 * @param height - The height of the list container.
 * @param itemSize - The size of each item in the list.
 * @param renderItem - A function that renders an item in the list.
 * @returns A virtualized list component.
 */
export const VirtualizedList = <T,>({
    items,
    height,
    itemSize,
    renderItem
}: VirtualizedListProps<T>) => {
    const parentRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => itemSize,
    })

    return (
        <Box
            ref={parentRef}
            sx={{
                height,
                overflow: 'auto',
                position: 'relative',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'primary.main',
                    borderRadius: '4px',
                },
            }}
        >
            <Box
                sx={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {virtualizer.getVirtualItems().map((virtualItem) => (
                    <Box
                        key={virtualItem.key}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        {renderItem({
                            item: items[virtualItem.index],
                            index: virtualItem.index,
                        })}
                    </Box>
                ))}
            </Box>
        </Box>
    )
} 