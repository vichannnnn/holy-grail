import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { LinkButton } from "./LinkButton";
import { Text, Title } from "@shared/ui/components";
import { getUser } from "@lib/auth";

/**
 * Render the hero section with promotional content and a contribution call-to-action that changes based on whether a user is signed in.
 *
 * @returns The hero section JSX element. The contribution button links to the upload page when a user is signed in, otherwise it links to the sign-in page.
 */
export async function Hero() {
	const user = await getUser();
	return (
		<div className="flex flex-col w-4/5 m-auto gap-8">
			<div className="flex flex-col-reverse items-center md:flex-row md:gap-16 gap-8">
				<div className="m-auto">
					<div className="animate-fade-in">
						<Title className="mb-4 mt-16 text-3xl font-bold">
							Access your notes you need in just a click.
						</Title>
						<Text className="mb-4">
							Holy Grail is a completely free-to-access web library aimed at Singaporean students
							that houses all the summary notes and practice papers for GCE 'O' Levels, GCE 'A'
							Levels and International Baccalaureate.
						</Text>
					</div>
					<LinkButton href="/library">
						<span>Head to the Library</span>
						<ArrowRightIcon className="size-5 inline-block ml-1 -mt-0.5" />
					</LinkButton>
				</div>
				<Image
					src="/trimmy-grail-chan-studying.webp"
					alt="Studying"
					width={250}
					height={250}
					priority
					fetchPriority="high"
					sizes="(max-width: 768px) 200px, 250px"
					className="max-w-full h-auto"
				/>
			</div>
			<div className="flex flex-col items-center md:flex-row md:gap-16 gap-8">
				<Image
					src="/trimmy-grail-chan-sparkling.webp"
					alt="Sparkling"
					width={250}
					height={250}
					priority
					fetchPriority="high"
					sizes="(max-width: 768px) 200px, 250px"
					className="max-w-full h-auto"
				/>
				<div className="m-auto gap-4">
					<div className="animate-fade-in">
						<Title className="mb-4 text-3xl font-bold">Want to contribute?</Title>
						<Text className="mb-4">
							Accessing notes is free for everyone in Holy Grail, even for those without an account.{" "}
							{user
								? "If you would like to contribute revision materials, you can click the button below to upload your material!"
								: "If you would like to contribute revision materials, you can sign up for an account below!"}
						</Text>
					</div>
					{user ? (
						<LinkButton href="/upload">
							<span>Contribute Now</span>
							<ArrowRightIcon className="size-5 inline-block ml-1 -mt-0.5" />
						</LinkButton>
					) : (
						<LinkButton href="/auth/sign-in">
							<span>Log in to Contribute</span>
							<ArrowRightIcon className="size-5 inline-block ml-1 -mt-0.5" />
						</LinkButton>
					)}
				</div>
			</div>
		</div>
	);
}