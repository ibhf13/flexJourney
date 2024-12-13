import {
    BarChart as BarChartIcon,
    ExpandMore,
    FitnessCenterOutlined,
    Schedule,
    Today,
    TrendingUp
} from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    Stack,
    Typography,
    useTheme
} from '@mui/material'
import { BarChart } from '@mui/x-charts'
import { format } from 'date-fns'
import { CHART_DIMENSIONS, CHART_MARGINS } from '../constants/chart'
import { useStatistics } from '../hooks/useStatistics'
import { accordionStyles } from '../styles/statisticsStyles'
import { StatCard as StatCardProps } from '../types/statisticsTypes'
import { StatisticCard } from './StatisticCard'

export const StatisticsOverview = ({ expanded = false }: { expanded?: boolean }) => {
    const { stats } = useStatistics()
    const theme = useTheme()
    const styles = accordionStyles(theme)

    if (!stats) return null

    const statCards: StatCardProps[] = [
        {
            icon: <Today color="primary" />,
            title: 'Training Days',
            value: stats.totalTrainingDays,
            subtitle: 'Total days trained'
        },
        {
            icon: <Schedule color="primary" />,
            title: 'Monthly Average',
            value: stats.averageWorkoutsPerMonth,
            subtitle: 'Workouts per month'
        },
        {
            icon: <FitnessCenterOutlined color="primary" />,
            title: 'Most Frequent',
            value: stats.mostFrequentExercise.name,
            subtitle: `${stats.mostFrequentExercise.count} sets total`
        },
        {
            icon: <TrendingUp color="primary" />,
            title: 'Total Volume',
            value: `${Math.round(stats.totalVolume).toLocaleString()} kg`,
            subtitle: 'Weight × Reps × Sets'
        }
    ]


    return (
        <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, sm: 3 } }}
            >
                {statCards.map((card, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
                            minWidth: { sm: '240px' }
                        }}
                    >
                        <StatisticCard {...card} />
                    </Box>
                ))}
            </Stack>

            <Accordion defaultExpanded={expanded} sx={styles.root}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={styles.summary}
                >
                    <BarChartIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        Monthly Activity
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={styles.details}>
                    <Box sx={{ height: CHART_DIMENSIONS.height, width: '100%', borderRadius: 1, p: 2 }}>
                        <BarChart
                            series={[
                                {
                                    data: stats.monthlyActivity.map(m => m.workouts),
                                    label: 'Workouts',
                                    color: theme.palette.primary.main
                                }
                            ]}
                            xAxis={[{
                                data: stats.monthlyActivity.map(m =>
                                    format(new Date(m.month), 'MMM yyyy')
                                ),
                                scaleType: 'band'
                            }]}
                            height={300}
                            margin={CHART_MARGINS}
                            slotProps={{
                                legend: {
                                    hidden: true
                                }
                            }}
                            sx={{
                                '.MuiChartsAxis-bottom .MuiChartsAxis-label': {
                                    transform: 'rotate(-45deg)',
                                    transformOrigin: 'top left'
                                },
                                '.MuiChartsAxis-line': {
                                    stroke: theme.palette.divider
                                },
                                '.MuiChartsAxis-tick': {
                                    stroke: theme.palette.divider
                                }
                            }}
                        />
                        <Paper
                            elevation={0}
                            sx={{
                                mt: 2,
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 4
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 0.5
                                    }}
                                />
                                <Typography>Workouts</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}