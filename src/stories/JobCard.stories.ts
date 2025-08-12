import type { Meta, StoryObj } from '@storybook/react'
import JobCard from '../components/JobCard'

const meta: Meta<typeof JobCard> = {
  component: JobCard
}

export default meta
type Story = StoryObj<typeof JobCard>

export const Basic: Story = {
  args: {
    title: 'Administrative Assistant',
    description: 'Administrative Assistant with Graphic Design Skills',
    company: 'GCE International Ltd.',
    location: 'Chaguanas',
    url: 'https://www.caribbeanjobs.com/Administrative-Assistant-Job-210801.aspx',
    createdAt: '2025-05-15 20:00:34.923',
    img: 'https://scontent.fpos2-1.fna.fbcdn.net/v/t39.30808-6/488255966_9538094322906743_110567560463440675_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=BLz-n_RpxNsQ7kNvwHHl2h0&_nc_oc=AdklMQIfoJSb8rvHCV4vWMRb-tgLMnBzSkJQ78f68hALGBmlUiJpz6BbZ_vsaXPEJWQ&_nc_zt=23&_nc_ht=scontent.fpos2-1.fna&_nc_gid=yYLZgsAVToVpbEpA89QTAw&oh=00_AfJKcbEMEwwVoSwN7jUORFkvfPA46GAcc_XCfEozJ0iTDA&oe=683173FE'
  }
}

export const BasicNoImage: Story = {
  args: {
    title: 'Administrative Assistant',
    description: 'Administrative Assistant with Graphic Design Skills',
    company: 'GCE International Ltd.',
    location: 'Chaguanas',
    url: 'https://www.caribbeanjobs.com/Administrative-Assistant-Job-210801.aspx',
    createdAt: '2025-05-15 20:00:34.923',
  }
}

export const Mockup: Story = {
  args: {
    title: 'Cyber Security Administrator',
    description: 'RResponsible for ensuring the security of IT infrastructure and data. Monitor, detect, investigate, analyze, and respond responsible for ensuring the security of IT infrastructure and data. Monitor, detect, investigate, analyze, and respond ...',
    company: 'Angostura Limited',
    location: 'Port-of-Spain',
    url: 'https://www.caribbeanjobs.com/Administrative-Assistant-Job-210801.aspx',
    createdAt: '2025-05-15 20:00:34.923',
  }
}
