import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Pagination from "../../components/pagination"
import {
  Folder, DollarSign, TrendingUp, Clock, Users, Tag, Edit3, Trash2, Eye, 
  Search, CheckCircle, AlertCircle, BarChart3, Calendar, CheckCircle2
} from "lucide-react"

export default function Projects() {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: "CRM System Development", 
      client: "Acme Corporation", 
      budget: 250000, 
      spent: 187500, 
      progress: 75, 
      status: true, 
      endDate: "30 Jun 2026", 
      teamSize: 4,
      priority: "High"
    },
    { 
      id: 2, 
      name: "E-Commerce Platform", 
      client: "Shopify Inc.", 
      budget: 180000, 
      spent: 120000, 
      progress: 45, 
      status: true, 
      endDate: "15 Aug 2026", 
      teamSize: 3,
      priority: "Medium"
    },
    { 
      id: 3, 
      name: "HR Management System", 
      client: "HR Solutions Ltd.", 
      budget: 320000, 
      spent: 280000, 
      progress: 90, 
      status: false, 
      endDate: "10 Jun 2026", 
      teamSize: 6,
      priority: "High"
    },
    { 
      id: 4, 
      name: "Mobile Banking App", 
      client: "Bank of India", 
      budget: 450000, 
      spent: 225000, 
      progress: 50, 
      status: true, 
      endDate: "20 Sep 2026", 
      teamSize: 8,
      priority: "Critical"
    },
    { 
      id: 5, 
      name: "Analytics Dashboard", 
      client: "DataCorp Analytics", 
      budget: 120000, 
      spent: 96000, 
      progress: 80, 
      status: true, 
      endDate: "15 May 2026", 
      teamSize: 2,
      priority: "Medium"
    },
    { 
      id: 6, 
      name: "SaaS Inventory System", 
      client: "InventoryPro", 
      budget: 200000, 
      spent: 40000, 
      progress: 20, 
      status: false, 
      endDate: "30 Oct 2026", 
      teamSize: 5,
      priority: "Low"
    },
  ])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.priority.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => { setCurrentPage(1) }, [searchTerm])
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1)
  }, [filteredProjects.length, totalPages, currentPage])

  const toggleStatus = (id) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, status: !project.status } : project
    ))
  }

  const handleDelete = (id) => {
    if (confirm(`Delete ${projects.find(p => p.id === id)?.name}?`)) {
      setProjects(prev => prev.filter(p => p.id !== id))
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
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
                Project Management
              </h1>
              <p className="text-slate-600 text-sm sm:text-lg mt-1 sm:mt-2 font-medium">
                ({filteredProjects.length} / {projects.length} active projects)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-end sm:items-center">
            <div className="relative w-full sm:w-64 lg:w-80">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search project, client, priority..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 py-2.5 sm:py-3 bg-slate-100/80 backdrop-blur-sm border border-slate-200/50 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 text-sm font-medium"
              />
            </div>
            <Link
              to="/dashboard/project/add"
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-2.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-3xl shadow-xl hover:shadow-2xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <Folder className="w-4 sm:w-5 h-4 sm:h-5 sm:w-6 sm:h-6" />
              New Project
            </Link>
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {currentProjects.map((project) => (
          <div key={project.id} className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border border-white/50 p-6 lg:p-8 relative overflow-hidden group">
            
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border-4 ${
              project.status 
                ? 'bg-emerald-400 border-emerald-300 shadow-emerald-300/50' 
                : 'bg-orange-400 border-orange-300 shadow-orange-300/50'
            }`}>
              {project.status ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <Clock className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 shadow-lg" 
                style={{ width: `${project.progress}%` }}
              />
            </div>

            {/* Content Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 lg:mb-8 gap-4 lg:gap-0">
              <div className="flex items-center gap-3 lg:gap-4 flex-1">
                <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Folder className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight line-clamp-2">{project.name}</h3>
                  <span className={`text-sm sm:text-base lg:text-lg font-semibold px-3 py-1 rounded-full mt-2 inline-block ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>

              {/* Toggle Button */}
              <div className="flex flex-col items-end gap-3 lg:gap-4 w-full lg:w-auto">
                <div className="flex items-center justify-between w-full lg:hidden gap-3 py-1">
                  <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {project.status ? 'Active' : 'Paused'}
                  </span>
                  <ToggleButton 
                    isActive={project.status}
                    onToggle={() => toggleStatus(project.id)}
                    activeColor="emerald"
                    inactiveColor="orange"
                    size="sm"
                  />
                </div>

                <div className="hidden lg:flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <TrendingUp className="w-3 h-3" />
                    Status
                  </div>
                  <ToggleButton 
                    isActive={project.status}
                    onToggle={() => toggleStatus(project.id)}
                    activeColor="emerald"
                    inactiveColor="orange"
                  />
                </div>
              </div>
            </div>

            {/* Project Stats */}
            <div className="space-y-3 sm:space-y-4 mb-8 lg:mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <div>
                  <span className="text-slate-800 font-semibold text-sm sm:text-base block">Budget Used</span>
                  <span className="text-emerald-600 font-bold text-lg">₹{(project.spent / 1000).toFixed(0)}K</span>
                  <span className="text-xs text-slate-500">of ₹{(project.budget / 1000).toFixed(0)}K</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <BarChart3 className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">{project.progress}% Progress</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">{project.teamSize} Team Members</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100/50">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </div>
                <span className="text-slate-800 font-semibold text-sm sm:text-base">
                  Ends: <span className="text-blue-600 font-bold">{project.endDate}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-5 sm:pt-6 border-t border-slate-100/50 bg-white/50 rounded-b-xl sm:rounded-b-2xl p-4 backdrop-blur-sm">
              <Link to={`/dashboard/project/${project.id}`} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base hover:shadow-blue-500/25">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" /> Dashboard
              </Link>
              <Link to={`/dashboard/project/edit/${project.id}`} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-5 sm:py-4 sm:px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base hover:shadow-emerald-500/25">
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" /> Edit
              </Link>
              <button onClick={() => handleDelete(project.id)} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg font-semibold text-sm sm:text-base hover:shadow-red-500/25">
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" /> Delete
              </button>
              <button 
                onClick={() => setSelectedProject(project)}
                className="w-11 sm:w-14 h-11 sm:h-14 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-500/25 hover:bg-blue-500/10 transition-all group"
                aria-label={`View ${project.name}`}
              >
                <Eye className="w-5 sm:w-6 h-5 sm:h-6 text-slate-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={() => setSelectedProject(null)}
        />
      )}

      {/* Empty States */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 sm:py-20">
          <Folder className="w-20 sm:w-24 h-20 sm:h-24 text-slate-400 mx-auto mb-6" />
          <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">{searchTerm ? 'No projects found' : 'No projects yet'}</h3>
          <p className="text-black-500 text-sm sm:text-base mb-6 sm:mb-8">{searchTerm ? 'Try different search term' : 'Create your first project'}</p>
          <Link to="/dashboard/project/register" className=" bg-white text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl shadow-xl inline-flex items-center gap-2 hover:shadow-2xl">
            <Folder className="w-4 sm:w-5 h-4 sm:h-5" /> New Project
          </Link>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8">
          <Pagination totalItems={filteredProjects.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  )
}

// ✅ FIXED ToggleButton Component
function ToggleButton({ isActive, onToggle, activeColor = "emerald", inactiveColor = "gray", size = "md" }) {
  const baseSize = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6'
  const knobSize = size === 'sm' ? 'w-4 h-4 top-0.5 left-0.5' : 'w-5 h-5 top-0.5 left-0.5'
  const travel = size === 'sm' ? 'translate-x-4' : 'translate-x-5.5'
  
  const colors = {
    emerald: { 
      active: 'bg-emerald-500 border-emerald-400 shadow-emerald-200/50', 
      inactive: 'bg-orange-400 border-orange-300 shadow-orange-200/50' 
    },
    green: { 
      active: 'bg-green-500 border-green-400 shadow-green-200/50', 
      inactive: 'bg-gray-300 border-gray-300 shadow-gray-100/50' 
    },
    orange: { 
      active: 'bg-orange-500 border-orange-400 shadow-orange-200/50', 
      inactive: 'bg-orange-400 border-orange-300 shadow-orange-200/50' 
    }
  }

  return (
    <button
      onClick={onToggle}
      className={`relative ${baseSize} rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-sm transition-all duration-200 ease-in-out overflow-hidden ${
        isActive 
          ? colors[activeColor]?.active || 'bg-emerald-500 border-emerald-400 shadow-emerald-200/50'
          : colors[inactiveColor]?.inactive || 'bg-gray-300 border-gray-300 shadow-gray-100/50'
      }`}
      aria-label={`Toggle ${isActive ? 'on' : 'off'}`}
    >
      <div className={`absolute ${knobSize} bg-white rounded-full shadow-md border transition-transform duration-200 ease-in-out ${
        isActive ? travel : 'translate-x-0.5'
      }`} />
    </button>
  )
}

// ✨ Enhanced Project Details Modal
function ProjectDetailsModal({ project, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[1000] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Folder className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-1">{project.name}</h2>
                <p className="text-xl font-semibold text-slate-800">{project.client}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/dashboard/project/edit/${project.id}`}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                onClick={onClose}
              >
                <Edit3 className="w-5 h-5 bg-blue-500 text-white" />
                Edit Project
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 text-center shadow-xl border border-emerald-100/50">
              <DollarSign className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
              <div className="text-4xl font-black text-slate-900 mb-1">₹{(project.spent / 1000).toFixed(0)}K</div>
              <p className="text-emerald-700 font-semibold text-lg">Budget Used</p>
              <p className="text-sm text-slate-600">of ₹{(project.budget / 1000).toFixed(0)}K total</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center shadow-xl border border-blue-100/50">
              <BarChart3 className="w-14 h-14 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-black text-slate-900 mb-1">{project.progress}%</div>
              <p className="text-blue-700 font-semibold text-lg">Progress</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 text-center shadow-xl border border-purple-100/50">
              <Users className="w-14 h-14 text-purple-600 mx-auto mb-4" />
              <div className="text-4xl font-black text-slate-900">{project.teamSize}</div>
              <p className="text-purple-700 font-semibold text-lg">Team Members</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center shadow-xl border border-orange-100/50">
              <Calendar className="w-14 h-14 text-orange-600 mx-auto mb-4" />
              <div className="text-3xl font-black text-slate-900">{project.endDate}</div>
              <p className="text-orange-700 font-semibold text-lg">End Date</p>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900">Project Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-slate-600 font-semibold">Client</span>
                  <span className="font-black text-xl text-slate-900">{project.client}</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-orange-50 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-slate-600 font-semibold">Priority</span>
                  <span className={`font-bold px-4 py-2 rounded-2xl text-sm shadow-md ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-3xl border border-slate-100 shadow-sm">
                  <span className="text-slate-600 font-semibold">Status</span>
                  <span className={`font-bold px-4 py-2 rounded-2xl text-sm shadow-md ${
                    project.status 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-orange-100 text-orange-800 border-orange-200'
                  }`}>
                    {project.status ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}













