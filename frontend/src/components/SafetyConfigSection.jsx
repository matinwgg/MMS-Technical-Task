"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export default function SafetyConfigSection() {
  const [contentFilterEnabled, setContentFilterEnabled] = useState(true)
  const [systemInstruction, setSystemInstruction] = useState(
    "Always respond in a professional, helpful tone suited for a B2B merchant platform."
  )
  const [model, setModel] = useState("gpt-4-turbo-preview")

  const handleSave = () => {
    alert("Configuration saved successfully!")
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle>Safety & Configuration</CardTitle>
        <CardDescription>
          System-wide settings and safety controls
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Content Filter Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-semibold text-foreground">
                Content Filter
              </Label>

              <button
                onClick={() =>
                  setContentFilterEnabled(!contentFilterEnabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  contentFilterEnabled
                    ? "bg-primary"
                    : "bg-muted border border-border"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    contentFilterEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Enable output content filter for all prompts
            </p>
          </div>

          {/* System Instruction */}
          <div>
            <Label
              htmlFor="system-instruction"
              className="text-sm font-semibold text-foreground mb-2 block"
            >
              System-wide Instruction
            </Label>

            <Textarea
              id="system-instruction"
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              className="min-h-24 resize-none"
              placeholder="Enter system-wide instructions..."
            />
          </div>

          {/* Default API Model */}
          <div>
            <Label
              htmlFor="model"
              className="text-sm font-semibold text-foreground mb-2 block"
            >
              Default API Model
            </Label>

            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="bg-background border border-border">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="gpt-4-turbo-preview">
                  GPT-4 Turbo Preview
                </SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">
                  GPT-3.5 Turbo
                </SelectItem>
                <SelectItem value="claude-3-opus">
                  Claude 3 Opus
                </SelectItem>
                <SelectItem value="claude-3-sonnet">
                  Claude 3 Sonnet
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
