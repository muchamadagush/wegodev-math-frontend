import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'
import { useRevenueReport, useUserGrowthReport, useAcademicReport, useTotalRevenueThisYear } from '../../hooks/useReports'
import { formatCurrency } from '../../hooks/useDashboard'

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('month') // 'week' | 'month' | 'year'

  const { data: revenueData, isLoading: revenueLoading } = useRevenueReport()
  const { data: growthData, isLoading: growthLoading } = useUserGrowthReport()
  const { data: academicData, isLoading: academicLoading } = useAcademicReport()
  const { totalRevenue } = useTotalRevenueThisYear()

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="mt-2 text-gray-600">Pantau performa bisnis dan akademik</p>
        </div>

        {/* Time Range Filter */}
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">7 Hari Terakhir</option>
            <option value="month">Bulan Ini</option>
            <option value="year">Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Section 1: Laporan Keuangan (Financial) */}
      <div className="mb-8 space-y-6">
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Laporan Keuangan</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">Tren pendapatan bulanan</p>
          </div>

          {revenueLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-gray-500">Memuat data...</div>
            </div>
          ) : !revenueData || revenueData.length === 0 ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-gray-500">Belum ada data</div>
            </div>
          ) : (
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value: any) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Total Revenue Card */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Pendapatan Tahun Ini</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            <p className="mt-2 text-xs font-medium text-green-600">+23% dari tahun lalu</p>
          </div>

          <div className="rounded-lg bg-white shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Pendapatan Rata-rata per Bulan</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(totalRevenue / (revenueData?.length || 1))}
            </p>
            <p className="mt-2 text-xs font-medium text-blue-600">Dari {revenueData?.length || 0} bulan</p>
          </div>
        </div>
      </div>

      {/* Section 2: Laporan Pertumbuhan User */}
      <div className="mb-8 rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Pertumbuhan Pengguna</h2>
          </div>
          <p className="mt-1 text-sm text-gray-600">Tren pertumbuhan siswa per bulan</p>
        </div>

        {growthLoading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="text-gray-500">Memuat data...</div>
          </div>
        ) : !growthData || growthData.length === 0 ? (
          <div className="flex h-80 items-center justify-center">
            <div className="text-gray-500">Belum ada data</div>
          </div>
        ) : (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Section 3: Laporan Akademik (Academic) */}
      <div className="mb-8 space-y-6">
        {/* Topic Performance */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Performa Topik</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">Rata-rata nilai siswa per topik (semakin rendah semakin sulit)</p>
          </div>

          {academicLoading ? (
            <div className="flex h-80 items-center justify-center">
              <div className="text-gray-500">Memuat data...</div>
            </div>
          ) : !academicData?.topicPerformance || academicData.topicPerformance.length === 0 ? (
            <div className="flex h-80 items-center justify-center">
              <div className="text-gray-500">Belum ada data</div>
            </div>
          ) : (
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={academicData.topicPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="topic" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip
                    formatter={(value: any) => `${value}%`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Top 5 Soal Tersulit */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900">Top 5 Soal Tersulit</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">Soal-soal yang paling banyak salah dijawab</p>
          </div>

          {academicLoading ? (
            <div className="flex items-center justify-center px-6 py-12">
              <div className="text-gray-500">Memuat data...</div>
            </div>
          ) : !academicData?.difficultQuestions || academicData.difficultQuestions.length === 0 ? (
            <div className="flex items-center justify-center px-6 py-12">
              <div className="text-gray-500">Belum ada data</div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {academicData.difficultQuestions.map((question: any, index: number) => (
                <div key={question.id} className="px-6 py-4 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-700">
                          {index + 1}
                        </span>
                        <p className="font-medium text-gray-900">{question.title}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Topik: {question.topic}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{question.correctRate}%</p>
                        <p className="text-xs text-gray-500">Dijawab benar</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{question.attempts}</p>
                        <p className="text-xs text-gray-500">Percobaan</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${question.correctRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
