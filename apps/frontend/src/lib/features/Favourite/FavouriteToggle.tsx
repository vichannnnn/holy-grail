"use client";
import type {FavouriteToggleProps} from "./types";
import {useState} from "react";
import {addFavourite, removeFavourite} from "./actions.ts"
import {IconButton} from "@shared/ui/components";
import {StarIcon} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

/**
 * Renders a star button that toggles the favourite status for the given note.
 *
 * Tapping the button calls the appropriate add/remove favourite action, updates the local
 * favourite state to reflect successful responses, and displays an error toast on failure
 * or unexpected errors.
 *
 * @param note - The note object to toggle as a favourite; used for its `id` and `document_name`.
 * @param userFavourites - Array of note IDs that are initially favourited for the current user.
 * @returns A JSX element containing the favourite toggle button for the provided note.
 */
export function FavouriteToggle({note, userFavourites}: FavouriteToggleProps) {
    const [isFavourite, setIsFavourite] = useState(userFavourites.includes(note.id));

    const toggleFavourite = async () => {
        try {
            if (isFavourite) {
                const result = await removeFavourite(note.id)
                if (result.ok) {
                    setIsFavourite(false)
                } else {
                    toast.error(result.message)
                }
            } else {
                const result = await addFavourite(note.id)
                if (result.ok) {
                    setIsFavourite(true)
                } else {
                    toast.error(result.message)
                }
            }
        }
        catch(err: unknown) {
            toast.error("An unexpected error occurred")
        }
    }


    return(
        <IconButton
            onClick={toggleFavourite}
            aria-label={`Favourite ${note.document_name}`}
            className="ml-2"
        >
            <StarIcon className={`h-5 w-5 ${isFavourite ? "fill-yellow-400 text-gray-700 dark:text-yellow-400" : "text-gray-700 dark:text-gray-300"}`} />
        </IconButton>
    )
}