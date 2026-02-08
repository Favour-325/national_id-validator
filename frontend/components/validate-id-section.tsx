'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { validate } from "@/apis"

interface NationalID {
  id_number: string
  full_name: string
  date_of_birth: string
  gender: string
  region: string
  nationality: string
}

interface ValidateIDSectionProps {
  ids: NationalID[]
}

export default function ValidateIDSection({ ids }: ValidateIDSectionProps) {
  const [searchID, setSearchID] = useState('')
  const [validationResult, setValidationResult] = useState<NationalID | null>(null)
  const [notFound, setNotFound] = useState(false)

  const handleValidate = async () => {
    setValidationResult(null)
    setNotFound(false)

    if (!searchID) {
      setNotFound(true)
      return
    }

    try {
      const response = await validate({id_number: searchID});
  
      if (response.status === 200 ) {
        setValidationResult(response.data)
      }

    } catch (error: any) {

      if (error.status === 404) {
        setNotFound(true)
        return

      } else if (error.status === 402) {

        return
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleValidate()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <Card className="border-secondary bg-white sticky top-8">
      <CardHeader className="border-b border-secondary bg-secondary/10">
        <CardTitle className="text-primary">Validate ID</CardTitle>
        <CardDescription>Search by ID number</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">ID Number</label>
            <Input
              type="text"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="CAM-123456"
              className="border-secondary bg-input"
            />
          </div>

          {/* Validate Button */}
          <Button
            onClick={handleValidate}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Validate
          </Button>

          {/* Results */}
          <div className="pt-4">
            {notFound && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <p className="font-semibold mb-1">Not Found</p>
                <p>The ID number "{searchID}" is not registered in the system.</p>
              </div>
            )}

            {validationResult && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <p className="font-semibold text-green-700">ID Valid & Verified</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-green-900">Name:</span>
                    <p className="text-green-800">{validationResult.full_name}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-green-900">DOB:</span>
                    <p className="text-green-800">{formatDate(validationResult.date_of_birth)}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-green-900">Gender:</span>
                    <p className="text-green-800">{validationResult.gender}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-green-900">Region:</span>
                    <p className="text-green-800">{validationResult.region}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-green-900">Nationality:</span>
                    <p className="text-green-800">{validationResult.nationality}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-secondary">
            <p className="text-xs text-muted-foreground text-center">
              {ids.length} ID{ids.length !== 1 ? 's' : ''} in system
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
