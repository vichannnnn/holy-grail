"use cache";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FAQ - Holy Grail",
	description:
		"Get answers to frequently asked questions about Holy Grail. Find information about our services, account management, and more.",
	openGraph: {
		title: "Frequently Asked Questions | Holy Grail",
		description:
			"Find quick answers to common questions about Holy Grail. Our comprehensive FAQ covers account setup, features, and everything you need to get started.",
		images: [
			{
				url: "",
			},
		],
	},
};

function FAQItem({
	question,
	children,
	alternate = false,
}: {
	question: string;
	children: React.ReactNode;
	alternate?: boolean;
}) {
	return (
		<div
			className={`rounded-xl px-6 py-5 ${alternate ? "bg-navy/[0.03] dark:bg-cream/[0.03]" : ""}`}
		>
			<h3 className="mb-3 text-lg font-semibold text-navy-deep dark:text-cream">
				{question}
			</h3>
			<div className="space-y-3 text-navy/70 dark:text-cream/60">{children}</div>
		</div>
	);
}

export default async function FAQPage() {
	return (
		<section className="relative overflow-hidden py-16">
			<div className="absolute -left-40 top-20 size-80 rounded-full bg-amber/5 blur-3xl dark:bg-amber/3" />
			<div className="absolute -right-40 bottom-20 size-80 rounded-full bg-coral/5 blur-3xl dark:bg-coral/3" />

			<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12 text-center animate-fade-in-up">
					<p className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber">
						Help Center
					</p>
					<h1 className="mb-4 text-3xl font-bold text-navy-deep dark:text-cream sm:text-4xl">
						Frequently Asked Questions
					</h1>
					<p className="mx-auto max-w-2xl text-navy/70 dark:text-cream/60">
						Quick answers to questions you may have. Can't find what you're
						looking for? Send the administrators a message through the relevant
						channels.
					</p>
				</div>

				<div className="animate-fade-in-up [animation-delay:100ms] space-y-1">
					<FAQItem question="What is the Holy Grail?">
						<p>
							Holy Grail is a collaborative initiative undertaken by a group of
							students in Singapore to compile a repository of notes and practice
							papers to support fellow students in their academic journey.
						</p>
						<p>
							The aim of this project is to reduce the gap in resources between
							students and level the playing field for everyone on a national
							scale.
						</p>
					</FAQItem>

					<FAQItem question="How did the Holy Grail come about?" alternate>
						<p>
							The project was initiated due to the absence of a suitable platform
							to store and access these educational resources.
						</p>
						<p>
							Initially stored in a collaborative Google Drive, a web application
							has since been developed to store and retrieve them much more
							conveniently and to make it more accessible, which is what you're
							seeing here now!
						</p>
					</FAQItem>

					<FAQItem question="How do I use the Holy Grail?">
						<p>
							You can access the resources uploaded at the{" "}
							<Link
								href="/library"
								className="font-medium text-amber hover:underline"
							>
								Library
							</Link>{" "}
							above this section. Anyone is able to freely access these resources
							even without having an account.
						</p>
					</FAQItem>

					<FAQItem question="How can I contribute my materials?" alternate>
						<p>
							You can upload the notes that you want to share over{" "}
							<Link
								href="/upload"
								className="font-medium text-amber hover:underline"
							>
								here
							</Link>
							. Do note that you can only upload PDF files and you will need an
							account to start uploading your notes. They will only be available
							to the public after approval.
						</p>
					</FAQItem>

					<FAQItem question="Will the Holy Grail always be free?">
						<p>
							Yes. The entire project and application is done out of initiative
							and will always be free. This means that content and resources such
							as contributed notes and practice papers will never be behind a
							paywall.
						</p>
					</FAQItem>

					<FAQItem question="How are you guys sustaining this project then?" alternate>
						<p>
							Aside from free time spent in development for this project, we are
							currently incurring monthly costs such as infrastructure and hosting
							that is being paid from our own pocket thus far.
						</p>
						<p>
							With that being said, as of November 2023, we are collaborating
							with sponsors that are helping us with the costs in exchange for
							displaying advertisements for their services. The remainders will
							go into development effort for more features in the near future
							(circa 2024).
						</p>
					</FAQItem>
				</div>
			</div>
		</section>
	);
}
