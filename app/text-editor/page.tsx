"use client"

import CodeEditor from "@/components/CodeEditor"
import { Card, CardContent } from "@/components/ui/card"

const page = () => {
  return (
    <div>
    <Card className="h-auto w-96">
    <CardContent>
      <CodeEditor />
    </CardContent>
  </Card>
    </div>
  )
}

export default page
