"use server"
import { apiClient } from "@lib/api-client";
import {UserFavouritesSchema} from "@lib/features/Favourite/schemas.ts";
import {isAxiosError} from "axios";

/**
 * Fetches the current user's favourite file IDs.
 *
 * @returns An object containing:
 * - `ok`: `true` if the favourites were fetched successfully, `false` otherwise.
 * - `message`: A human-readable status message.
 * - `FavouriteFileList`: An array of favourite file IDs (empty on failure).
 */
export async function getUserFavourites () {
    try{
        const response = await apiClient.get("favourites/")
        const UserFavourites = response.data
        let FavouriteFileList: number[] = []
        if (UserFavourites.length > 0) {
            UserFavourites.map((favourite: UserFavouritesSchema)=>{
                FavouriteFileList.push(favourite.file_id)
            })
        }
        return {
            ok: true,
            message: "Fetched user favourites successfully",
            FavouriteFileList: FavouriteFileList,
        }
    }
    catch(err: unknown){
        if (isAxiosError(err) && err.response) {
            const status = err.response.status;

            const errorMessages = {
                401: "Authentication required to Fetch User Favourites. Please login.",
            } as const;

            const errorMessage =
                errorMessages[status as keyof typeof errorMessages] ??
                "Failed to Fetch User Favourites. Please try again.";

            return { ok: false, message: errorMessage, FavouriteFileList: []  };
        }
        return {
            ok: false,
            message: "Failed to Fetch User Favourites. Please try again.",
            FavouriteFileList: [],
        };
    }

}

/**
 * Adds the specified file to the current user's favourites.
 *
 * @param fileId - The identifier of the file to add to favourites.
 * @returns `{ ok: true, message: string, data: any }` on success containing the server response in `data`; `{ ok: false, message: string }` on failure.
 */
export async function addFavourite (fileId: number){
    try{
        const response = await apiClient.post("favourites/add", {
            file_id: fileId
        })
        return{
            ok: true,
            message: "Added to favourites successfully",
            data: response.data
        }
    }
    catch (err: unknown) {
        if (isAxiosError(err) && err.response) {
            const status = err.response.status;

            const errorMessages = {
                401: "Authentication required. Please login.",
            } as const;

            const errorMessage =
                errorMessages[status as keyof typeof errorMessages] ??
                "Failed to add to favourites. Please refresh try again.";

            return { ok: false, message: errorMessage };
        }
        return {
            ok: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}

/**
 * Remove a file from the current user's favourites.
 *
 * @param fileId - The ID of the file to remove from favourites
 * @returns An object with `ok` indicating success; on success `message` contains a confirmation and `data` contains the server response, on failure `message` contains an error description
 */
export async function removeFavourite (fileId: number){
    try{
        const response = await apiClient.post("favourites/remove", {
            file_id: fileId
        })
        return{
            ok: true,
            message: "Removed from favourites successfully",
            data: response.data
        }
    }
    catch (err: unknown) {
        if (isAxiosError(err) && err.response) {
            const status = err.response.status;

            const errorMessages = {
                401: "Authentication required. Please login.",
                404: "Failed to remove from favourites. Please refresh and try again.",
            } as const;

            const errorMessage =
                errorMessages[status as keyof typeof errorMessages] ??
                "Failed to remove from favourites. Please try again.";

            return { ok: false, message: errorMessage };
        }
        return {
            ok: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}