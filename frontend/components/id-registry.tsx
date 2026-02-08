'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface NationalID {
  id_number: string
  full_name: string
  date_of_birth: string
  gender: string
  region: string
  nationality: string
  created_at: string
}

interface IDRegistryProps {
  ids: NationalID[]
}

export default function IDRegistry({ ids }: IDRegistryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <Card className="border-secondary bg-white">
      <CardHeader className="border-b border-secondary bg-secondary/10">
        <CardTitle className="text-primary">Registered IDs</CardTitle>
        <CardDescription>Total: {ids.length} national ID records</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {ids.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No IDs registered yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ids.map((id) => (
              <div
                key={id.id_number}
                className="border border-secondary rounded-lg p-4 hover:bg-secondary/5 transition-colors"
              >
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-primary">ID Number:</span>
                    <p className="text-foreground font-mono">{id.id_number}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Full Name:</span>
                    <p className="text-foreground">{id.full_name}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Date of Birth:</span>
                    <p className="text-foreground">{formatDate(id.date_of_birth)}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Gender:</span>
                    <p className="text-foreground">{id.gender}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Region:</span>
                    <p className="text-foreground">{id.region}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Nationality:</span>
                    <p className="text-foreground">{id.nationality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
