import { Outlet } from "react-router"


function AdminLayout() {
  return (
    <div className="bg-blue-400">
        <Outlet/>
    </div>
  )
}

export default AdminLayout