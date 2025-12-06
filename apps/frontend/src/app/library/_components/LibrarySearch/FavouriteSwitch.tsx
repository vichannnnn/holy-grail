"use client";
import { memo } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import { useState } from "react";
import { useNavigateToSearchValue } from "../utils";
import { FavouriteSwitchProps } from "./types";

function FavouriteSwitchInner({query}: FavouriteSwitchProps) {
    const [enabled, setEnabled] = useState(query?.favourites_only ? (query.favourites_only === "true") : false);
    const navigateToSearchValue = useNavigateToSearchValue();

    const toggleEnabled = () => {
        navigateToSearchValue({
            name: "favourites_only",
            value: (enabled ? "false" : "true"),
        });
        setEnabled(!enabled);
    }

    return (
        <Field className="flex flex-col gap-1 sm:items-center">
            <div className="flex flex-col gap-0.5">
                <Label
                    as="label"
                    className="text-sm/6 font-medium text-black dark:text-zinc-200"
                >
                    <div className="flex gap-x-0.5">
                        Favourites
                    </div>
                </Label>
            </div>

            <div className="relative sm:mt-1">
                <Switch
                    checked={enabled}
                    onChange={toggleEnabled}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 dark:bg-gray-500 transition data-checked:bg-pink-500 cursor-pointer"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
            </div>
        </Field>
    )
}

export const FavouriteSwitch = memo(FavouriteSwitchInner);
