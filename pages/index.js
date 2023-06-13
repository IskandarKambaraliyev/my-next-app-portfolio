import { useTranslation } from "@/useTranslation"
import Layout from "./Layout"
import UnderConstruction from "@/components/underConstruction/UnderConstruction";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Layout>
      <UnderConstruction />
    </Layout>
  )
}
