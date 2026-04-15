import type { Meta, StoryObj } from "@storybook/react";
import JobCard from "../components/JobCard";

const meta: Meta<typeof JobCard> = {
  component: JobCard,
};

export default meta;
type Story = StoryObj<typeof JobCard>;

export const Basic: Story = {
  args: {
    title: "CHIEF INTERNAL AUDITOR",
    description: "",
    company: "First Citizens Bank",
    companyId: "70e8aa50-bbae-418b-9e7f-629626bc4d95",
    location: "Port of Spain, POS, TT",
    url: "https://careers.firstcitizenstt.com/job/Port-of-Spain-CHIEF-INTERNAL-AUDITOR-POS/1377752633/",
    createdAt: "2026-04-11T15:02:16.133Z",
    company_data: {
      id: "70e8aa50-bbae-418b-9e7f-629626bc4d95",
      title: "First Citizens Bank",
      logoUrl:
        "https://gwsxvrxzesawtbtdekmz.supabase.co/storage/v1/object/public/companies/70e8aa50-bbae-418b-9e7f-629626bc4d95/logo.jpg",
    },
  },
};

export const BasicNoImage: Story = {
  args: {
    title: "Administrative Assistant",
    description: "Administrative Assistant with Graphic Design Skills",
    company: "GCE International Ltd.",
    location: "Chaguanas",
    url: "https://www.caribbeanjobs.com/Administrative-Assistant-Job-210801.aspx",
    createdAt: "2025-05-15 20:00:34.923",
  },
};

export const Mockup: Story = {
  args: {
    title: "Cyber Security Administrator",
    description:
      "RResponsible for ensuring the security of IT infrastructure and data. Monitor, detect, investigate, analyze, and respond responsible for ensuring the security of IT infrastructure and data. Monitor, detect, investigate, analyze, and respond ...",
    company: "Angostura Limited",
    location: "Port-of-Spain",
    url: "https://www.caribbeanjobs.com/Administrative-Assistant-Job-210801.aspx",
    createdAt: "2025-05-15 20:00:34.923",
  },
};
