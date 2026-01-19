import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { LinkButton } from "./LinkButton";
import { Text } from "@shared/ui/components";
import { getUser } from "@lib/auth";
import {
	GradientMesh,
	FloatingElement,
	BlobDecoration,
	GrainOverlay,
} from "../shared";

export async function Hero() {
	const user = await getUser();

	return (
		<section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
			<GradientMesh />
			<GrainOverlay className="opacity-[0.02] dark:opacity-[0.04]" />

			<BlobDecoration
				variant="pink"
				size="lg"
				className="-top-20 -right-20 opacity-60"
			/>
			<BlobDecoration
				variant="lavender"
				size="md"
				className="bottom-20 -left-16 opacity-40"
			/>

			<FloatingElement
				variant="star"
				size="lg"
				className="top-24 right-[15%]"
			/>
			<FloatingElement
				variant="sparkle"
				size="md"
				delay="delayed"
				className="top-40 right-[25%]"
			/>
			<FloatingElement
				variant="star"
				size="sm"
				delay="delayed-2"
				className="bottom-32 left-[20%]"
			/>
			<FloatingElement
				variant="dot"
				size="lg"
				className="top-1/3 left-[10%]"
			/>
			<FloatingElement
				variant="sparkle"
				size="sm"
				delay="delayed"
				className="bottom-40 right-[30%]"
			/>

			<div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
				<div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
					<div className="flex-1 text-center md:text-left">
						<h1 className="animate-fade-in-up text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-warm-black dark:text-white leading-[1.1]">
							Your journey to{" "}
							<span className="gradient-text">exam success</span>{" "}
							starts here
						</h1>

						<Text className="animate-fade-in-up-delayed mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-xl">
							Free summary notes and practice papers for GCE O/A Levels and IB.
							Built by students, for students.
						</Text>

						<div className="animate-fade-in-up-delayed-2 flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
							<LinkButton
								href="/library"
								variant="solid"
								className="btn-glow px-6 py-3 text-base font-semibold"
							>
								<span>Explore Library</span>
								<ArrowRightIcon className="size-5 inline-block ml-2 -mt-0.5" />
							</LinkButton>

							{user ? (
								<LinkButton
									href="/upload"
									variant="outline"
									className="px-6 py-3 text-base font-semibold"
								>
									<span>Contribute</span>
								</LinkButton>
							) : (
								<LinkButton
									href="/login"
									variant="outline"
									className="px-6 py-3 text-base font-semibold"
								>
									<span>Sign In</span>
								</LinkButton>
							)}
						</div>
					</div>

					<div className="flex-shrink-0 animate-slide-in-right">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-lavender-300/30 rounded-full blur-3xl scale-110" />
							<Image
								src="/trimmy-grail-chan-studying.webp"
								alt="Grail-chan studying"
								width={320}
								height={320}
								priority
								fetchPriority="high"
								sizes="(max-width: 768px) 240px, 320px"
								className="relative z-10 max-w-full h-auto animate-float drop-shadow-xl"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up-delayed-3">
				<div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
					<span className="text-xs uppercase tracking-widest">Scroll</span>
					<div className="w-5 h-8 border-2 border-zinc-300 dark:border-zinc-600 rounded-full flex justify-center pt-1.5">
						<div className="w-1 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
					</div>
				</div>
			</div>
		</section>
	);
}
