import zod from "zod"

export const userSchema = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "At least 6 character"),
  username:zod.string().min(3,"At least 6 character"),
})

export const bookSchema = zod.object({
  title: zod.string(),
  description:zod.string(),
})

export const orderSchema = zod.object({
  userId: zod.string().min(1,"Invalid user id"),
  bookId: zod.string().min(1,"Invalid book id"),
})

export const loginSchema = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(6, "At least 6 character"),
})
