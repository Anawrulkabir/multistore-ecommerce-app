'use client'

import { useEffect } from 'react'

import { ThemeController } from '@/components/ui/theme-controller'
import { useStoreModal } from '@/hooks/use-store-modal'

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [onOpen, isOpen])
  return (
    <div className="p-4">
      <p>Root Page</p>
      <ThemeController />
    </div>
  )
}

export default SetupPage
