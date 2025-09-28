// components/application-section.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ApplicationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        <div className="text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">
            Apply now!
          </h2>
        </div>

        <div className="max-w-md">
          <ApplicationCard />
        </div>
      </div>
    </section>
  )
}

function ApplicationCard() {
  return (
    <Card className="bg-gray-100 border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-black">Apply</h3>
          <p className="text-gray-600 text-sm">
            Looking for a side hustle?
          </p>
        </div>

        {/* Apply Button */}
        <div className="pt-4">
          <Button 
            className="w-full bg-white hover:bg-gray-50 text-black border border-gray-300 py-6 text-lg font-medium rounded-lg shadow-sm"
            variant="outline"
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}