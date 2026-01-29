import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren{
    icon:React.ReactNode,
    title:string,
}

function HeroCard({icon,title,children}:Props) {
  return (
    <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>

  )
}

export default HeroCard