import { getUser } from "@lib/auth/getUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const user = await getUser();

	if (user) redirect("/");

	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
			<div className="absolute -left-40 top-1/4 size-96 rounded-full bg-amber/10 blur-3xl dark:bg-amber/5" />
			<div className="absolute -right-40 bottom-1/4 size-96 rounded-full bg-coral/10 blur-3xl dark:bg-coral/5" />

			<div className="relative w-full max-w-md">
				<div className="mb-8 flex flex-col items-center">
					<Link href="/" className="group">
						<div className="relative">
							<div className="absolute -inset-3 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100 dark:from-amber/10 dark:to-coral/10" />
							<Image
								src="/trimmy-grail-chan-sparkling.webp"
								alt="Grail-chan"
								width={100}
								height={100}
								className="relative transition-transform group-hover:scale-105"
							/>
						</div>
					</Link>
				</div>

				<div className="rounded-2xl border border-navy/5 bg-white/70 p-8 shadow-xl backdrop-blur-sm dark:border-cream/5 dark:bg-navy/50">
					{children}
				</div>
			</div>
		</section>
	);
}
