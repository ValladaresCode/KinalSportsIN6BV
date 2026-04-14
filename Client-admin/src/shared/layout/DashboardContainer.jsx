import { Navbar } from "./Navbar.jsx"
import { Sidebar } from "./Sidebar.jsx"

export const DashboardContainer = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar/>
        <div className="flex flex-1">
            <Sidebar/>
        </div>
    </div>
  )
}
