import { Title, Text, Button } from "@shared/ui/components";
import { unauthorized } from "next/navigation";
import { getUser } from "@lib/auth";
import { fetchAllCategories, fetchAllDocumentTypes } from "@/app/library/actions";
import Image from "next/image";
import type { Metadata } from "next";
import { UploadWorkspace, UploadGuidelines } from "./_components";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
	title: "Upload - Holy Grail",
	description:
		"Upload and share resources to the Holy Grail library. Contribute to our growing collection of educational materials and tools.",
	openGraph: {
		title: "Contribute Resources | Holy Grail",
		description:
			"Share your knowledge with the Holy Grail community. Upload educational resources, documents, and materials to help others and enhance our collaborative platform.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default async function UploadPage() {
	const user = await getUser();

	if (!user) {
		unauthorized();
	}

	if (!user.verified) {
		return (
			<main className="min-h-[60vh] flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<div className="relative mx-auto mb-6 w-fit">
						<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-amber/20 to-coral/20 blur-2xl dark:from-amber/10 dark:to-coral/10" />
						<Image
							src="/trimmy-grail-chan-sparkling.webp"
							alt="Grail-chan"
							width={120}
							height={120}
							className="relative"
						/>
					</div>
					<Title order={2} className="mb-3 text-2xl font-bold text-navy-deep dark:text-cream">
						Almost There!
					</Title>
					<Text className="mb-6 text-navy/70 dark:text-cream/60">
						You need to verify your account before you can upload materials. Check your email for
						the verification link.
					</Text>
					<Link href="/account">
						<Button variant="solid">
							<span>Go to Account Settings</span>
							<ArrowRightIcon className="ml-1.5 size-4" />
						</Button>
					</Link>
				</div>
			</main>
		);
	}

	const [categories, documentTypes] = await Promise.all([
		fetchAllCategories(),
		fetchAllDocumentTypes(),
	]);

	if (!categories.ok || !documentTypes.ok || !categories.data || !documentTypes.data) {
		return (
			<main className="min-h-[60vh] flex items-center justify-center px-4">
				<div className="text-center max-w-md">
					<div className="relative mx-auto mb-6 w-fit">
						<div className="absolute -inset-4 rounded-full bg-gradient-to-br from-coral/20 to-amber/20 blur-2xl dark:from-coral/10 dark:to-amber/10" />
						<Image
							src="/trimmy-grail-chan-sparkling.webp"
							alt="Grail-chan"
							width={120}
							height={120}
							className="relative"
						/>
					</div>
					<Title order={2} className="mb-3 text-2xl font-bold text-navy-deep dark:text-cream">
						Something went wrong
					</Title>
					<Text className="mb-4 text-navy/70 dark:text-cream/60">
						We couldn't load the upload page right now. Please try again later.
					</Text>
					<div className="text-sm text-navy/50 dark:text-cream/40">
						{categories.err && <p>Categories: {categories.err}</p>}
						{documentTypes.err && <p>Document Types: {documentTypes.err}</p>}
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="flex flex-col">
			<section className="relative overflow-hidden py-8 md:py-10">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-coral/8 via-transparent to-transparent dark:from-coral/5" />

				<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center">
						<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral dark:border-coral/30 dark:bg-coral/20">
							<SparklesIcon className="size-4" />
							<span>You're awesome</span>
						</div>

						<Title className="mb-3 text-2xl font-bold tracking-tight text-navy-deep dark:text-cream sm:text-3xl">
							Thanks for contributing, <span className="text-coral">{user.username}</span>!
						</Title>

						<Text className="max-w-lg text-navy/70 dark:text-cream/60">
							Your notes help thousands of students across Singapore. Please review our{" "}
							<UploadGuidelines>
								<span className="font-medium text-amber hover:underline cursor-pointer">
									uploading guidelines
								</span>
							</UploadGuidelines>{" "}
							before uploading.
						</Text>
					</div>
				</div>
			</section>

			<section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
				<UploadWorkspace categories={categories.data} documentTypes={documentTypes.data} />
			</section>
		</main>
	);
}
