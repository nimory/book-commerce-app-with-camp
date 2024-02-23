import "server-only";
import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  customFetch: (input, init) => {
    if (typeof input === "string") {
      const newInput = new URL(input);
      const time = new Date();
      newInput.searchParams.set("cacheclearparam", `${time.getMinutes()}`);
      return fetch(newInput.href, init);
    }
    return fetch(input, init);
  },
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "e-book-nimo",
    customRequestInit: {
      next: {
        revalidate: 3600,
      },
    },
  });

  return allBooks;
};

export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "e-book-nimo",
    contentId,
    customRequestInit: {
      cache: "no-store",
    },
  });

  return detailBook;
};
