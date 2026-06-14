import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
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
