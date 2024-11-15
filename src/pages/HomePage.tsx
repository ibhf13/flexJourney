import { PageContainer } from '@/components/common/StructureComponents/PageContainer'
import { WelcomeSection } from '@/features/home/components/WelcomeSection'
import { useAuthContext } from '@features/auth/contexts/AuthContext'
import { QuickActions } from '@features/home/components/QuickActions'
import { SeedDataButton } from '@features/home/components/SeedDataButton'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { user } = useAuthContext()

  const allowSeed = user?.uid === 'TZ5qhIjQIphdxb8VlIFhZJJ1NKy2' || 'VvjUP3SpQGNwARNFQl1HjG725Ly1'

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
        <QuickActions />
        {allowSeed && <SeedDataButton />}
      </Box>
    </PageContainer>
  )
}

export default HomePage