import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Pagination from "../../components/pagination"
import {
  Users, UserCheck, UserX, Edit3, Trash2, Eye, Mail, Phone, Calendar, Search, 
  LogIn, CheckCircle
} from "lucide-react"

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Aman", email: "aman@gmail.com", phone: "9876543210", role: "Frontend Dev", joining: "24 Dec 2024", active: true, isLoggedIn: true },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", phone: "9876543211", role: "Backend Dev", joining: "10 Jan 2025", active: true, isLoggedIn: false },
    { id: 3, name: "Sana", email: "sana@gmail.com", phone: "9876543212", role: "UI Designer", joining: "15 Feb 2025", active: false, isLoggedIn: false },
    { id: 4, name: "Imran", email: "imran@gmail.com", phone: "9876543213", role: "Tester", joining: "20 Mar 2025", active: true, isLoggedIn: true },
    { id: 5, name: "Neha", email: "neha@gmail.com", phone: "9876543214", role: "Manager", joining: "05 Apr 2025", active: true, isLoggedIn: true },
    { id: 6, name: "Arjun", email: "arjun@gmail.com", phone: "9876543215", role: "DevOps", joining: "12 May 2025", active: false, isLoggedIn: false },
  ])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => { setCurrentPage(1) }, [searchTerm])
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1)
  }, [filteredEmployees.length, totalPages, currentPage])

  const toggleLoginStatus = (id) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, isLoggedIn: !emp.isLoggedIn } : emp
    ))
  }

  const toggleActiveStatus = (id) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, active: !emp.active } : emp
    ))
  }

  const handleDelete = (id) => {
    if (confirm(`Delete ${employees.find(emp => emp.id === id)?.name}?`)) {
      setEmployees(prev => prev.filter(emp => emp.id !== id))
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      {/* HEADER */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 mb-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-3 sm:w-4 h-16 sm:h-20 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg"></div>
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Team Members
              </h1>
              <p className="text-slate-600 text-sm sm:text-lg mt-1 sm:mt-2 font-medium">
                ({filteredEmployees.length} / {employees.length} total)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-end sm:items-center">
            <div className="relative w-full sm:w-64 lg:w-80">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, role, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 py-2.5 sm:py-3 bg-slate-100/80 backdrop-blur-sm border border-slate-200/50 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 text-sm font-medium"
              />
            </div>
            <Link
              to="/dashboard/employee/register"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-2.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-3xl shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <Users className="w-4 sm:w-5 h-4 sm:h-5 sm:w-6 sm:h-6" />
              Add Employee
            </Link>
          </div>
        </div>
      </div>

      {/* EMPLOYEES GRID - FULLY RESPONSIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {currentEmployees.map((emp) => (
          <div key={emp.id} className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-white/50 p-6 lg:p-8 relative overflow-hidden">
            
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 sm:border-4 ${
              emp.active 
                ? 'bg-emerald-400 border-emerald-300 shadow-emerald-300/50' 
                : 'bg-red-400 border-red-300 shadow-red-300/50'
            }`}>
              {emp.active ? (
                <UserCheck className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
              ) : (
                <UserX className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-white" />
              )}
            </div>

            {/* Content Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 lg:mb-8 pt-2 lg:pt-4 gap-4 lg:gap-0">
              <div className="flex items-center gap-3 lg:gap-4 flex-1">
                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">{emp.name}</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-slate-600 bg-slate-100 px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl mt-1">{emp.role}</p>
                </div>
              </div>

              {/* ✨ RESPONSIVE TOGGLE BUTTONS */}
              <div className="flex flex-col items-end gap-3 lg:gap-4 w-full lg:w-auto lg:ml-4">
                {/* 📱 MOBILE: Stack vertically */}
                <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {emp.active ? 'Active' : 'Deactive'}
                  </span>
                  <ToggleButton 
                    isActive={emp.active}
                    onToggle={() => toggleActiveStatus(emp.id)}
                    activeColor="emerald"
                    inactiveColor="red"
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <LogIn className="w-3 h-3" />
                    {emp.isLoggedIn ? 'On' : 'Off'}
                  </span>
                  <ToggleButton 
                    isActive={emp.isLoggedIn}
                    onToggle={() => toggleLoginStatus(emp.id)}
                    activeColor="green"
                    inactiveColor="gray"
                    size="sm"
                  />
                </div>

                {/* 💻 DESKTOP: Compact side-by-side */}
                <div className="hidden lg:flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle className="w-3 h-3" />
                    Status
                  </div>
                  <ToggleButton 
                    isActive={emp.active}
                    onToggle={() => toggleActiveStatus(emp.id)}
                    activeColor="emerald"
                    inactiveColor="red"
                  />
                  
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <LogIn className="w-3 h-3" />
                    Session
                  </div>
                  <ToggleButton 
                    isActive={emp.isLoggedIn}
                    onToggle={() => toggleLoginStatus(emp.id)}
                    activeColor="green"
                    inactiveColor="gray"
                  />
                </div>
              </div>
            </div>

            {/* Employee Info - Responsive */}
            <div className="space-y-3 sm:space-y-4 mb-8 lg:mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base break-words">{emp.email}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">{emp.phone}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Joined: <span className="text-blue-600 font-bold">{emp.joining}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-slate-100/50 bg-white/50 rounded-b-xl sm:rounded-b-2xl p-4 backdrop-blur-sm">
              <Link to={`/dashboard/employee/edit/${emp.id}`} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base" aria-label={`Edit ${emp.name}`}>
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" /> Edit
              </Link>
              <button onClick={() => handleDelete(emp.id)} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base" aria-label={`Delete ${emp.name}`}>
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> Delete
              </button>
              <Link to={`/dashboard/employee/view/${emp.id}`} className="w-11 sm:w-14 h-11 sm:h-14 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-lg" aria-label={`View ${emp.name}`}>
                <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-slate-600" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty States */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <Users className="w-20 sm:w-24 h-20 sm:h-24 text-slate-400 mx-auto mb-6" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">{searchTerm ? 'No matches found' : 'No employees yet'}</h3>
          <p className="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8">{searchTerm ? 'Try different search term' : 'Add your first team member'}</p>
          <Link to="/dashboard/employee/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl shadow-xl inline-flex items-center gap-2 hover:shadow-2xl">
            <Users className="w-4 sm:w-5 h-4 sm:h-5" /> Add Employee
          </Link>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8">
          <Pagination totalItems={filteredEmployees.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  )
}

// ✨ RESPONSIVE TOGGLE COMPONENT
function ToggleButton({ isActive, onToggle, activeColor, inactiveColor, size = "md" }) {
  const baseSize = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6'
  const knobSize = size === 'sm' ? 'w-4 h-4 top-0.5' : 'w-5 h-5 top-0.5'
  const travel = size === 'sm' ? 'translate-x-4' : 'translate-x-5'
  
  const colors = {
    green: { active: 'bg-green-500 border-green-400 shadow-green-200/50', inactive: 'bg-slate-200 border-slate-300 shadow-slate-100' },
    emerald: { active: 'bg-emerald-500 border-emerald-400 shadow-emerald-200/50', inactive: 'bg-red-500 border-red-400 shadow-red-200/50' },
    gray: { active: 'bg-slate-500 border-slate-400 shadow-slate-200/50', inactive: 'bg-slate-200 border-slate-300 shadow-slate-100' },
    red: { active: 'bg-orange-500 border-orange-400 shadow-orange-200/50', inactive: 'bg-red-500 border-red-400 shadow-red-200/50' }
  }

  return (
    <button
      onClick={onToggle}
      className={`relative ${baseSize} rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-sm transition-all duration-200 ease-in-out overflow-hidden ${
        isActive ? colors[activeColor].active : colors[inactiveColor || activeColor].inactive
      }`}
      aria-label={`Toggle ${isActive ? 'on' : 'off'}`}
    >
      <div className={`absolute ${knobSize} bg-white rounded-full shadow-md border transition-transform duration-200 ease-in-out ${
        isActive ? travel : 'translate-x-0.5'
      }`} />
    </button>
  )
}
