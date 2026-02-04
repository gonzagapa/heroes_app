import CustomBreadCrumbs from '@/components/custom/CustomBreadCrumbs'

export default function HeroPage() {
  return (
    <div>
       <CustomBreadCrumbs items={[
          {href:"/",label:"Home"},
          {href:"/hero",label:"Hero"},
        ]} 
        current="Hero"
        />
    </div>
  )
}
