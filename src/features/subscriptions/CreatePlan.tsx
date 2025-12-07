import { useNavigate } from 'react-router-dom'
import PlanForm from './PlanForm'
import { useCreatePlan } from '../../hooks/useSubscriptions'
import type { SubscriptionPlan } from '../../types'

export default function CreatePlan() {
  const navigate = useNavigate()
  const createPlan = useCreatePlan()

  const handleSubmit = (data: Partial<SubscriptionPlan>) => {
    createPlan.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard/subscriptions')
      }
    })
  }

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">Tambah Paket Langganan</h1>
      <PlanForm 
        onSubmit={handleSubmit}
        isLoading={createPlan.isPending}
      />
    </div>
  )
}
