import Link from "next/link";
import { Title, Text } from "@shared/ui/components";
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

export default function FAQPage() {
	return (
		<div className="container mx-auto px-4 mt-16">
			<div className="mb-8">
				<Title order={1} className="text-2xl mb-2">
					Frequently Asked Questions
				</Title>
				<Text className="mb-6">
					Quick answers to questions you may have. Can't find what you're looking for? Send the
					administrators a message through the relevant channels.
				</Text>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="flex flex-col space-y-6">
					<div>
						<Title order={3} className="text-lg mb-2">
							What is the Holy Grail?
						</Title>
						<Text>
							Holy Grail is a collaborative initiative undertaken by a group of students in
							Singapore to compile a repository of notes and practice papers to support fellow
							students in their academic journey.
						</Text>
						<Text className="mt-4">
							The aim of this project is to reduce the gap in resources between students and level
							the playing field for everyone on a national scale.
						</Text>
					</div>

					<div>
						<Title order={3} className="text-lg mb-2">
							How did the Holy Grail come about?
						</Title>
						<Text>
							The project was initiated due to the absence of a suitable platform to store and
							access these educational resources.
						</Text>
						<Text className="mt-4">
							Initially stored in a collaborative Google Drive, a web application has since been
							developed to store and retrieve them much more conveniently and to make it more
							accessible, which is what you're seeing here now!
						</Text>
					</div>

					<div>
						<Title order={3} className="text-lg mb-2">
							How do I use the Holy Grail?
						</Title>
						<Text>
							You can access the resources uploaded at the{" "}
							<Link href="/library" passHref>
								<span className="text-blue-600 hover:underline">Library</span>
							</Link>{" "}
							above this section. Anyone is able to freely access these resources even without
							having an account.
						</Text>
					</div>
				</div>

				<div className="flex flex-col space-y-6">
					<div>
						<Title order={3} className="text-lg mb-2">
							How can I contribute my materials?
						</Title>
						<Text>
							You can upload the notes that you want to share over{" "}
							<Link href="/upload" passHref>
								<span className="text-blue-600 hover:underline cursor-pointer">here</span>
							</Link>
							. Do note that you can only upload PDF files and you will need an account to start
							uploading your notes. They will only be available to the public after approval.
						</Text>
					</div>

					<div>
						<Title order={3} className="text-lg mb-2">
							Will the Holy Grail always be free?
						</Title>
						<Text>
							Yes. The entire project and application is done out of initiative and will always be
							free. This means that content and resources such as contributed notes and practice
							papers will never be behind a paywall.
						</Text>
					</div>

					<div>
						<Title order={3} className="text-lg mb-2">
							How are you guys sustaining this project then?
						</Title>
						<Text>
							Aside from free time spent in development for this project, we are currently incurring
							monthly costs such as infrastructure and hosting that is being paid from our own
							pocket thus far.
						</Text>
						<Text className="mt-4">
							With that being said, as of November 2023, we are collaborating with sponsors that are
							helping us with the costs in exchange for displaying advertisements for their
							services. The remainders will go into development effort for more features in the near
							future (circa 2024).
						</Text>
					</div>
				</div>
			</div>
		</div>
	);
}
