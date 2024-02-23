type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  Thumbnail: { url: string };
  createdAt: string;
  updateAt: string;
};

type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Purchase = {
  includes(id: string): boolean;
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
};
export type { BookType, User, Purchase };
