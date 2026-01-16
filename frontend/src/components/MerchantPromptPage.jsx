import { useState } from "react"
import PromptLibrarySection from "./PromptLibrarySection"
import PromptPlaygroundSection from "./PromptPlaygroundSection"
import { updateMerchant } from "../api/merchantApi"

export default function MerchantPromptPage() {
  const [selectedMerchant, setSelectedMerchant] = useState(null)

  const handleUpdateMerchant = async (updated) => {
    try {
      await updateMerchant(updated.id, updated)
      setSelectedMerchant(updated)
      alert("Merchant updated successfully")
    } catch (err) {
      console.error(err)
      alert("Failed to update merchant")
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <div className="xl:col-span-2 h-full">
        <PromptLibrarySection
          onSelectPrompt={null}
          selectedPrompt={null}
          onSelectMerchant={setSelectedMerchant}
        />
      </div>
      <div className="xl:col-span-3 h-full">
        <PromptPlaygroundSection
          merchant={selectedMerchant}
          onUpdateMerchant={handleUpdateMerchant}
        />
      </div>
    </div>
  )
}
