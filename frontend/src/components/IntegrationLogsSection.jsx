"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CheckCircle, Pause } from "lucide-react"

const INTEGRATIONS = [
  {
    id: 1,
    name: "Merchant Support Chatbot",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    name: "Product Description Generator",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    name: "Review Sentiment Analyzer",
    status: "PAUSED",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
]

const LOG_ENTRIES = [
  {
    id: 1,
    timestamp: "2025-01-14 14:32:05",
    prompt: "Customer Support Response",
    status: "SUCCESS",
  },
  {
    id: 2,
    timestamp: "2025-01-14 14:28:42",
    prompt: "Fraud Analysis",
    status: "SUCCESS",
  },
  {
    id: 3,
    timestamp: "2025-01-14 14:25:18",
    prompt: "Product Description",
    status: "ERROR",
  },
  {
    id: 4,
    timestamp: "2025-01-14 14:20:55",
    prompt: "Email Personalization",
    status: "SUCCESS",
  },
  {
    id: 5,
    timestamp: "2025-01-14 14:15:30",
    prompt: "Sentiment Analysis",
    status: "SUCCESS",
  },
]

export default function IntegrationLogsSection() {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle>Live Integrations</CardTitle>
        <CardDescription>
          Deployment status and activity logs
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Integrations Status */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Integration Status
          </h3>

          <div className="space-y-2">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-primary" />
                  <span className="text-sm text-foreground font-medium">
                    {integration.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={integration.statusColor}>
                    {integration.status}
                  </Badge>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2"
                  >
                    {integration.status === "ACTIVE" ? (
                      <Pause size={14} />
                    ) : (
                      <CheckCircle size={14} />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logs Preview */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Recent Logs
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {LOG_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between text-xs p-2 bg-muted rounded border border-border"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground">
                    {entry.timestamp}
                  </p>
                  <p className="text-foreground font-medium truncate">
                    {entry.prompt}
                  </p>
                </div>

                <Badge
                  className={
                    entry.status === "SUCCESS"
                      ? "bg-green-100 text-green-800 ml-2 flex-shrink-0"
                      : "bg-red-100 text-red-800 ml-2 flex-shrink-0"
                  }
                >
                  {entry.status}
                </Badge>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-3 text-xs bg-transparent"
          >
            View All Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
