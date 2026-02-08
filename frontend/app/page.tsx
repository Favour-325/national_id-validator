'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import IDRegistry from '@/components/id-registry'
import CreateIDForm from '@/components/create-id-form'
import ValidateIDSection from '@/components/validate-id-section'
import { get_all } from '@/apis'

interface NationalID {
  id_number: string
  full_name: string
  date_of_birth: string
  gender: string
  region: string
  nationality: string
  created_at: string
}

export default function Page() {
  const [ids, setIds] = useState<NationalID[]>([])

  async function get_ids() {
    const response = await get_all()

    setIds(response.data)

  }

  useEffect(() => {
    get_ids();
  }, [])

  const handleAddID = (newID: NationalID) => {
    setIds([...ids, newID])
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">National ID Validator</h1>
          <p className="text-primary-foreground/80">Manage, create, and validate national identification numbers</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Section 1: ID Registry */}
          <div className="lg:col-span-2">
            <IDRegistry ids={ids} />
          </div>

          {/* Section 2: Validation */}
          <div>
            <ValidateIDSection ids={ids} />
          </div>
        </div>

        {/* Section 3: Create ID Form - Full Width */}
        <div className="mt-8">
          <CreateIDForm  />
        </div>
      </div>
    </main>
  )
}
