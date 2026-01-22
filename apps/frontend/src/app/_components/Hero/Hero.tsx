import { ArrowRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { Button, Text, Title } from "@shared/ui/components";
import { SearchBar } from "./SearchBar";

export async function Hero() {
	return (
		<section className="relative overflow-hidden py-12 md:py-20">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber/10 via-transparent to-transparent dark:from-amber/5" />

			<div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col-reverse items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
					<div className="flex-1 text-center md:text-left">
						<div className="animate-fade-in-up">
							<Title className="mb-4 text-4xl font-bold tracking-tight text-navy-deep dark:text-cream sm:text-5xl lg:text-6xl">
								Exams are coming.
								<span className="mt-2 block text-amber">Your notes are here.</span>
							</Title>

							<Text className="mb-8 max-w-xl text-lg text-navy/80 dark:text-cream/70">
								Free summary notes and practice papers for O-Level, A-Level, and IB students in
								Singapore. Curated by students, for students.
							</Text>
						</div>

						<div className="animate-fade-in-up [animation-delay:100ms] flex flex-col gap-4 sm:flex-row sm:items-center">
							<Link href="/library">
								<Button
									variant="glow"
									className="w-full bg-amber text-navy-deep hover:bg-amber-light shadow-amber/25 hover:shadow-amber/40 sm:w-auto"
								>
									<span>Browse the Library</span>
									<ArrowRightIcon className="-mt-0.5 ml-2 inline-block size-5" />
								</Button>
							</Link>
						</div>

						<div className="animate-fade-in-up [animation-delay:200ms] mt-6">
							<SearchBar />
						</div>
					</div>

					<div className="relative flex-shrink-0 animate-float">
						<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-2xl dark:from-amber/10 dark:to-coral/10" />
						<Image
							src="/trimmy-grail-chan-studying.webp"
							alt="Grail-chan studying"
							width={320}
							height={320}
							priority
							fetchPriority="high"
							sizes="(max-width: 768px) 200px, 320px"
							className="relative h-auto max-w-[200px] md:max-w-[280px] lg:max-w-[320px]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
