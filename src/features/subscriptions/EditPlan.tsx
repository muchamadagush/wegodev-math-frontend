import { useParams, useNavigate } from 'react-router-dom'
import PlanForm from './PlanForm'
import { useSubscriptionPlan, useUpdatePlan } from '../../hooks/useSubscriptions'
import type { SubscriptionPlan } from '../../types'

export default function EditPlan() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: plan, isLoading, error } = useSubscriptionPlan(id!)
  const updatePlan = useUpdatePlan()

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Memuat data paket...</p>
      </div>
    )
  }

  if (error || !plan) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Paket tidak ditemukan</p>
      </div>
    )
  }

  const handleSubmit = (data: Partial<SubscriptionPlan>) => {
    updatePlan.mutate(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate('/dashboard/subscriptions')
        }
      }
    )
  }

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">Edit Paket Langganan</h1>
      <PlanForm 
        initialData={plan}
        onSubmit={handleSubmit}
        isLoading={updatePlan.isPending}
      />
    </div>
  )
}
