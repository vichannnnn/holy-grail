import type { LinkData } from "./types";
import { Home } from "@lib/icons/Home";
import { QuestionCircle } from "@lib/icons/QuestionCircle";
import { Upload } from "@lib/icons/Upload";
import { Register } from "@lib/icons/Register";
import { Leaderboard } from "@lib/icons/Leaderboard";
import { Login } from "@lib/icons/Login";
import { Document } from "@lib/icons/Document";

export const NAV_LINKS: Record<string, LinkData> = {
	home: { label: "Home", href: "/", icon: <Home /> },
	library: { label: "Library", href: "/library", icon: <Document /> },
	faq: { label: "FAQ", href: "/faq", icon: <QuestionCircle /> },
	contribute: { label: "Contribute", href: "/contribute", icon: <Upload /> },
	leaderboard: { label: "Leaderboard", href: "/leaderboard", icon: <Leaderboard /> },
};

export const AUTH_LINKS: Record<string, LinkData> = {
	signIn: { label: "Sign In", href: "/auth/signin", icon: <Login /> },
	register: { label: "Register", href: "/auth/register", icon: <Register /> },
};
