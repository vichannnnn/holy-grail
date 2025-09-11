"use server";
import type { RegisterSchema } from "./schemas";
import { setUser } from "@lib/auth";
import { apiClient } from "@lib/api-client";
import { CurrentUserWithJWTSchema, type CurrentUserWithJWT } from "@lib/auth/schemas";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export async function register(values: RegisterSchema): Promise<{ ok: boolean; message?: string }> {
	let parsedData: CurrentUserWithJWT | null = null;

	try {
		const response = await apiClient.post("/auth/create", values);

		// validate network response shape with centralized zod schema
		const parseResult = CurrentUserWithJWTSchema.safeParse(response.data);
		if (!parseResult.success) {
			const msg = "Register failed: unexpected response shape";
			return { ok: false, message: msg };
		}

		parsedData = parseResult.data;
	} catch (err: unknown) {
		// handle axios errors explicitly, return status to caller instead of throwing
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			const message = err.response.data?.message ?? err.response.statusText ?? "Request failed";
			return { ok: false, message: `Register failed (${status}): ${message}` };
		}
		const message = err instanceof Error ? err.message : String(err);
		return { ok: false, message };
	}

	// parsedData is typed as CurrentUserWithJWT by zod inference
	const { data, access_token } = parsedData as CurrentUserWithJWT;

	let expiresAtMs: number;
	try {
		if (typeof jwtDecode !== "function") throw new Error("jwtDecode is not a function");
		const decodedToken = jwtDecode<{ exp?: number }>(access_token);
		// pass absolute expiry timestamp in milliseconds to setUser (exp is seconds since epoch)
		expiresAtMs = decodedToken?.exp ? decodedToken.exp * 1000 : Date.now();
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return { ok: false, message: `token decoding failed: ${message}` };
	}

	try {
		await setUser(data, access_token, expiresAtMs);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return { ok: false, message: `failed to set auth cookies: ${message}` };
	}

	return { ok: true };
}
