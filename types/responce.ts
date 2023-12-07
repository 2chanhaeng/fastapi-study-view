export interface Board {
  id: number;
  subject: string;
  description: string;
  posts: Post[];
}

export interface Post {
  id: number;
  subject: string;
  content: string;
  create_date: string;
}
