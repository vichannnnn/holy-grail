"use server"
import { apiClient } from "@lib/api-client";
import {UserFavouritesSchema} from "@lib/features/Favourite/schemas.ts";
import {isAxiosError} from "axios";

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