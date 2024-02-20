export type User = {
  id: string
  email: string
  name: string
  profile_image: string
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  user_id: string
  title: string
  content: string
  published: boolean
  created_at: string
  updated_at: string
}
