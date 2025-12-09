import { useNavigate } from 'react-router-dom'
import { Users, GraduationCap, CreditCard, DollarSign, Plus, FileText, TrendingUp } from 'lucide-react'
import { useDashboardStats, useRecentActivities, formatRelativeTime, formatCurrency } from '../../hooks/useDashboard'

export default function DashboardHome() {
  const navigate = useNavigate()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: activities, isLoading: activitiesLoading } = useRecentActivities()

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Selamat Datang, Admin 👋</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Parents */}
        <StatCard
          title="Total Orang Tua"
          value={statsLoading ? '-' : stats?.totalParents || 0}
          icon={Users}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
          trend="+12% bulan ini"
        />

        {/* Total Students */}
        <StatCard
          title="Total Siswa"
          value={statsLoading ? '-' : stats?.totalStudents || 0}
          icon={GraduationCap}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
          trend="+8% bulan ini"
        />

        {/* Active Subscriptions */}
        <StatCard
          title="Langganan Aktif"
          value={statsLoading ? '-' : stats?.activeSubscriptions || 0}
          icon={CreditCard}
          bgColor="bg-green-50"
          iconColor="text-green-600"
          trend="+5 minggu ini"
        />

        {/* Total Revenue */}
        <StatCard
          title="Pendapatan Total"
          value={statsLoading ? '-' : formatCurrency(stats?.totalRevenue || 0)}
          icon={DollarSign}
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
          trend="+23% bulan ini"
        />
      </div>

      {/* Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
              </div>
            </div>

            {activitiesLoading ? (
              <div className="flex items-center justify-center px-6 py-12">
                <div className="text-gray-500">Memuat aktivitas...</div>
              </div>
            ) : !activities || activities.length === 0 ? (
              <div className="flex items-center justify-center px-6 py-12">
                <div className="text-gray-500">Belum ada aktivitas</div>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activities.map((activity: any) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.action}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {formatRelativeTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="rounded-lg bg-white shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>

            <div className="space-y-3">
              <QuickActionButton
                label="Tambah Topik"
                icon={Plus}
                onClick={() => navigate('/dashboard/curriculum')}
                variant="primary"
              />

              <QuickActionButton
                label="Tambah Item"
                icon={Plus}
                onClick={() => alert('Feature coming soon')}
                variant="secondary"
              />

              <QuickActionButton
                label="Lihat Laporan"
                icon={FileText}
                onClick={() => navigate('/dashboard/reports')}
                variant="secondary"
              />
            </div>

            {/* Summary Box */}
            <div className="mt-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4 border border-blue-100">
              <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                Insight
              </p>
              <p className="mt-2 text-sm text-blue-700">
                {stats?.activeSubscriptions || 0} dari {stats?.totalStudents || 0} siswa memiliki
                langganan aktif
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Stat Card Component
 */
interface StatCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  bgColor: string
  iconColor: string
  trend?: string
}

function StatCard({
  title,
  value,
  icon: Icon,
  bgColor,
  iconColor,
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>
          {trend && (
            <p className="mt-2 text-xs font-medium text-green-600">
              {trend}
            </p>
          )}
        </div>
        <div className={`rounded-lg ${bgColor} p-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  )
}

/**
 * Quick Action Button Component
 */
interface QuickActionButtonProps {
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

function QuickActionButton({
  label,
  icon: Icon,
  onClick,
  variant = 'secondary',
}: QuickActionButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
        isPrimary
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}
