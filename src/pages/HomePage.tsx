import { PageContainer } from '@/components/common/StructureComponents/PageContainer'
import env from '@/config/env.config'
import { HomePageSkeleton } from '@/features/home/components/HomePageSkeleton'
import { HomeStats } from '@/features/home/components/HomeStats'
import { WelcomeSection } from '@/features/home/components/WelcomeSection'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { useStatistics } from '@/features/statistics/hooks/useStatistics'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { QuickActions } from '@features/home/components/QuickActions'
import { SeedDataButton } from '@features/home/components/SeedDataButton'
import { Box, Paper } from '@mui/material'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { isLoading: isProfileLoading } = useProfile()
  const { isLoading: isStatsLoading } = useStatistics()
  const { user } = useAuthContext()
  const { stats } = useStatistics()

  if (isProfileLoading || isStatsLoading) {
    return <HomePageSkeleton />
  }

  const allowSeed = user?.uid === env.ADMIN_TOKEN

  return (
    <PageContainer>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          py: { xs: 2, md: 4 }
        }}
      >
        <WelcomeSection />

        {user && stats && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              backgroundColor: 'background.paper'
            }}
          >
            <HomeStats />
          </Paper>
        )}

        <QuickActions />
        {allowSeed && <SeedDataButton />}
      </Box>
    </PageContainer>
  )
}

export default HomePage