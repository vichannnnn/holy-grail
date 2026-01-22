import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { Button, Text, Title } from "@shared/ui/components";
import { getUser } from "@lib/auth";

export async function ContributeCTA() {
	const user = await getUser();

	return (
		<section className="py-16">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="relative overflow-hidden rounded-3xl border border-coral/10 bg-gradient-to-br from-coral/5 via-white/60 to-amber/5 p-8 shadow-sm backdrop-blur-sm dark:border-coral/20 dark:from-coral/10 dark:via-navy/40 dark:to-amber/10 md:p-12">
					<div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-coral/10 blur-3xl dark:bg-coral/5" />
					<div className="absolute -left-32 -top-32 size-96 rounded-full bg-amber/10 blur-3xl dark:bg-amber/5" />

					<div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-12">
						<div className="relative flex-shrink-0 animate-float [animation-delay:1s]">
							<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-coral/20 to-amber/20 blur-2xl dark:from-coral/10 dark:to-amber/10" />
							<Image
								src="/trimmy-grail-chan-sparkling.webp"
								alt="Grail-chan sparkling"
								width={260}
								height={260}
								sizes="(max-width: 768px) 160px, 260px"
								className="relative h-auto max-w-[160px] md:max-w-[260px]"
							/>
						</div>

						<div className="flex-1 text-center md:text-left">
							<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral dark:border-coral/30 dark:bg-coral/20">
								<SparklesIcon className="size-4" />
								<span>Help the community</span>
							</div>

							<Title className="mb-4 text-3xl font-bold text-navy-deep dark:text-cream sm:text-4xl">
								Want to help others ace their exams?
							</Title>

							<Text className="mb-6 max-w-lg text-navy/70 dark:text-cream/60">
								{user
									? "Share your notes with thousands of students across Singapore. Your contribution helps build the best free study resource."
									: "Join our community of contributors. Sign up to share your notes and help students across Singapore succeed."}
							</Text>

							<div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
								{user ? (
									<Link href="/upload">
										<Button
											variant="solid"
											className="w-full bg-coral text-white hover:bg-coral-soft sm:w-auto"
										>
											<span>Contribute Your Notes</span>
											<ArrowRightIcon className="-mt-0.5 ml-2 inline-block size-5" />
										</Button>
									</Link>
								) : (
									<Link href="/auth/sign-in">
										<Button
											variant="solid"
											className="w-full bg-coral text-white hover:bg-coral-soft sm:w-auto"
										>
											<span>Sign Up to Contribute</span>
											<ArrowRightIcon className="-mt-0.5 ml-2 inline-block size-5" />
										</Button>
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
