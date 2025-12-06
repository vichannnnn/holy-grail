import type { Note } from "@/app/library/types";

export interface FavouriteToggleProps {
    note: Note;
    userFavourites: number[];
}