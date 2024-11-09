import { PageContainer } from '@/components/common/StructureComponents/PageContainer'
import { QuickActions } from '@/features/home/components/QuickActions'
import { WelcomeSection } from '@/features/home/components/WelcomeSection'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'

const HomePage = () => {

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
      </Box>
    </PageContainer>
  )
}

export default HomePage