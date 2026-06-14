import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const tag = slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () =>
      fetchNotes("", 1, tag.toLowerCase() === "all" ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

// import { fetchNotes } from "../../lib/api";
// import NotePage from "./Notes.client";

// const Notes = async () => {
//   const notes = await fetchNotes("", 1);

//   return <NotePage res={notes} />;
// };

// export default Notes;
