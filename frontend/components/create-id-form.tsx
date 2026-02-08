'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { create } from "@/apis"

interface NationalID {
  id_number: string
  full_name: string
  date_of_birth: string
  gender: string
  region: string
  nationality: string
  created_at: string
}

interface CreateIDFormProps {
  onAddID: (id: NationalID) => void
}

export default function CreateIDForm() {
  const [formData, setFormData] = useState({
    id_number: "",
    full_name: "",
    date_of_birth: "",
    gender: "Male",
    region: "",
    nationality: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.id_number.trim()) {
      setError('ID Number is required')
      return
    }
    if (!formData.full_name.trim()) {
      setError('Full Name is required')
      return
    }
    if (!formData.date_of_birth) {
      setError('Date of Birth is required')
      return
    }
    if (!formData.region.trim()) {
      setError('Region is required')
      return
    }
    if (!formData.nationality.trim()) {
      setError('Nationality is required')
      return
    }

    // Create new ID
    try {
      await create(formData);

    } catch (error: any) {

      if (error.status === 406) {
        setError('Invalid ID number');
        return
        
      }
    }

    // Reset form
    setFormData({
      id_number: '',
      full_name: '',
      date_of_birth: '',
      gender: 'Male',
      region: '',
      nationality: '',
    })

    setSuccess('ID created successfully!')
    setTimeout(() => setSuccess(''), 3000)
    
  }
  useEffect(() => {}, [handleSubmit])

  return (
    <Card className="border-secondary bg-white">
      <CardHeader className="border-b border-secondary bg-secondary/10">
        <CardTitle className="text-primary">Create New ID</CardTitle>
        <CardDescription>Register a new national identification number</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID Number */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">ID Number *</label>
              <Input
                type="text"
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                placeholder="CAM-123456"
                className="border-secondary bg-input"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
              <Input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="border-secondary bg-input"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Date of Birth *</label>
              <Input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="border-secondary bg-input"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-secondary rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Region *</label>
              <Input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., Northern Region"
                className="border-secondary bg-input"
              />
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Nationality *</label>
              <Input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="e.g., Cameroonian"
                className="border-secondary bg-input"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Create ID
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
