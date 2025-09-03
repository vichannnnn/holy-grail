"use server";
import type { SignInSchema } from "./schemas";
import { setUser } from "@lib/auth";
import { apiClient } from "@lib/api-client";
import { CurrentUserWithJWTSchema, type CurrentUserWithJWT } from "@lib/auth/schemas";
import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export async function signin(values: SignInSchema): Promise<{ ok: boolean; message?: string }> {
	let response: any;
	let parsedData: CurrentUserWithJWT | null = null;
  
	try {
		response = await apiClient.post("/auth/login", values);

		// validate network response shape with centralized zod schema
		const parseResult = CurrentUserWithJWTSchema.safeParse(response.data);
		if (!parseResult.success) {
			const msg = `Signin failed: unexpected response shape`;
			return { ok: false, message: msg };
		}

		parsedData = parseResult.data;
	} catch (err: unknown) {
		// handle axios errors explicitly, return status to caller instead of throwing
		if (isAxiosError(err) && err.response) {
			const status = err.response.status;
			const message = err.response.data?.message ?? err.response.statusText ?? "Request failed";
			return { ok: false, message: `Signin failed (${status}): ${message}` };
		}
		const message = err instanceof Error ? err.message : String(err);
		return { ok: false, message };
	}

	// parsedData is typed as CurrentUserWithJWT by zod inference
	const { data, access_token } = parsedData;

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
    // const mock = {
    //   access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZWJhc3Nub29iIiwiZXhwIjoxNzU2OTg3ODI5fQ.urztqWMW3cXuy61LATDK_AEk7rybuVMUAQWOyIcjhF4",
    //   user: JSON.parse('{"user_id":54,"email":"sebastian.ong@hotmail.com","username":"sebassnoob","role":1,"verified":true}')
    // }
		// await setUser(mock.user, mock.access_token, 1856911681641);
    await setUser(data, access_token, expiresAtMs);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		return { ok: false, message: `failed to set auth cookies: ${message}` };
	}

	return { ok: true };
}
