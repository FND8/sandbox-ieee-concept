import * as z from "zod"

export const eventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must provide more detail." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Valid date is required." }),
  location: z.string().min(3, { message: "Location is required." }),
  status: z.enum(['upcoming', 'ongoing', 'completed'], { 
    errorMap: () => ({ message: "Please select a valid status." }) 
  }),
  theme: z.string().optional(),
})

export type EventValues = z.infer<typeof eventSchema>