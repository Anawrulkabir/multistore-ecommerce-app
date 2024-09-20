'use client'

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '@/components/ui/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const formSchema = z.object({
  name: z.string().min(3).max(255),
})

const StoreModal = () => {
  const storeModal = useStoreModal()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/stores', values)
      console.log(response.data)

      toast({
        description: 'A new store has been created',
      })
    } catch (error) {
      console.error('Failed to create store', error)

      toast({
        variant: 'destructive',
        title: 'Failed to create a new store.',
        // description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage "
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Groceries"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end pt-6 space-x-2">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cencel
                </Button>
                <Button disabled={loading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
