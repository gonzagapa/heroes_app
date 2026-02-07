import CustomBreadCrumbs from '@/components/custom/CustomBreadCrumbs'
import { useParams } from 'react-router'

export default function HeroPage() {

  const {slug} = useParams()
  return (
    <div>
      <h1>{slug}</h1>
       <CustomBreadCrumbs items={[
          {href:"/",label:"Home"},
          {href:"/hero",label:"Hero"},
        ]} 
        current="Hero"
        />
    </div>
  )
}
