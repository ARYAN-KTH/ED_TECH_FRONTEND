import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AxiosError } from "axios"
import { Loader2, Pencil } from "lucide-react"
import { toast } from "sonner"
import { sectionFormSchema, type SectionFormValues } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import api from "../../../../../axiosService"
import { useEffect, useState } from "react"

interface Section {
    _id: string
    title: string
    description: string
    course: string
}

const EditSection = ({section , refetch}: {section: Section, refetch: () => void}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: {
        title: section.title,
        description: section.description
    }
  })

    useEffect(() => {
      reset({
        title: section.title,
        description: section.description
      })
    }, [section, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SectionFormValues) => {
      return api.put(`/course/update-section/${section._id}/${section.course}`, data)
    },
    onSuccess: () => {
      toast.success("Section updated successfully")
      reset()
      setIsOpen(false)
      refetch()
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Something went wrong!")
    },
  })

  const sectionHandler = (data: SectionFormValues) => {
    mutate(data)
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>  
        <DialogTrigger>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit Section</DialogTitle>
          <form onSubmit={handleSubmit(sectionHandler)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" placeholder="Enter section title" {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea id="description" placeholder="Enter section description" {...register("description")} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Pencil className="w-4 h-4 mr-2" />}
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditSection
