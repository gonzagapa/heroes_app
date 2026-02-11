import { useSearchParams } from 'react-router';
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props{
    totalPages:number;
}

function CustomPagination({totalPages}:Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") ?? '1'; 
  const currentPage = isNaN(+page) ? 1: +page;

  const handlePageChange = (newPage:number)=>{

    if(newPage < 1 || newPage > totalPages) return;
    setSearchParams((prev)=>{
      prev.set("page", `${newPage}`)
      return prev;
    })
  }


  return (
    <>
    {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" 
          onClick={()=> handlePageChange(currentPage-1)} size="sm" disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {Array.from({length:totalPages}).map((_,index)=>(
            <Button key={index} 
            onClick={()=> handlePageChange(index+1)}
            variant={index+1 === currentPage ? "default" : "outline"} size="sm">
                {index +1}
            </Button>
          ))}

          <Button
          onClick={()=> handlePageChange(currentPage+1)} 
          variant="outline" 
          disabled={totalPages === currentPage} size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
    </>
  )
}

export default CustomPagination