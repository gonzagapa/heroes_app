import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props{
    totalPages:number;
}

function CustomPagination({totalPages}:Props) {
    let currentPage = 4; 


  return (
    <>
    {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {Array.from({length:totalPages}).map((_,index)=>(
            <Button key={index} variant={index+1 === currentPage ? "default" : "outline"} size="sm">
                {index +1}
            </Button>
          ))}

          <Button variant="outline" disabled={totalPages === currentPage} size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
    </>
  )
}

export default CustomPagination