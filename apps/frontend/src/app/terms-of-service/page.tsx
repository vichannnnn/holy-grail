import Link from "next/link";
import { Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service - Holy Grail",
	description:
		"Review the Terms of Service for Holy Grail. Learn about the terms for using the platform, including account creation and user responsibilities.",
	openGraph: {
		title: "Terms of Service - Holy Grail",
		description:
			"Understand the terms for using Holy Grail. Read about your rights and obligations, and how to use the platform responsibly.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default function TermsOfServicePage() {
	return (
		<main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
			<section className="mb-12">
				<Title order={1} className="text-3xl md:text-4xl font-bold mb-6 text-navy-deep dark:text-cream">
					Terms of Service
				</Title>

				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Welcome, and thank you for your interest in{" "}
					<span className="font-semibold text-navy-deep dark:text-cream">Holy Grail Team</span> ('Holy Grail Team,' 'we,' or 'us') and
					our mobile and web application <span className="font-semibold text-navy-deep dark:text-cream">Holy Grail</span>, along with
					our related services (collectively, the 'Service'). These Terms of Service, including Holy
					Grail Team's Privacy Policy (available{" "}
					<Link href="/privacy" className="text-amber hover:underline">
						here
					</Link>
					), (together, these 'Terms') are a legally binding contract between you and Holy Grail
					Team regarding your use of the Service.
				</Text>

				<div className="mt-6 p-4 rounded-xl bg-amber/10 dark:bg-amber/20 border border-amber/20">
					<Text className="text-sm leading-relaxed text-navy-deep dark:text-cream">
						PLEASE READ THE FOLLOWING TERMS CAREFULLY: BY CLICKING 'I ACCEPT,' SIGNING AN ORDER FORM
						THAT REFERENCES THESE TERMS, OR BY DOWNLOADING, INSTALLING, OR OTHERWISE ACCESSING OR
						USING THE SERVICE, YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD, AND, AS A CONDITION TO
						YOUR USE OF THE SERVICE, YOU AGREE TO BE BOUND BY, THESE TERMS. IF YOU ARE NOT ELIGIBLE OR
						DO NOT AGREE TO THESE TERMS, THEN YOU DO NOT HAVE OUR PERMISSION TO USE THE SERVICE. YOUR
						USE OF THE SERVICE AND HOLY GRAIL TEAM'S PROVISION OF THE SERVICE TO YOU CONSTITUTES AN
						AGREEMENT BY BOTH PARTIES TO BE BOUND BY THESE TERMS.
					</Text>
				</div>

				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					If you are using the Service on behalf of an organization, the individual accepting these
					Terms on the organization's behalf represents that they have the authority to bind the
					organization to these Terms.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					NOTICE OF ARBITRATION AND CLASS ACTION WAIVER
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Except for certain disputes described in Section 15, you agree that disputes arising under
					these Terms will be resolved by binding, individual arbitration, and BY ACCEPTING THESE
					TERMS, YOU AND HOLY GRAIL TEAM WAIVE THE RIGHT TO A TRIAL BY JURY OR PARTICIPATION IN A
					CLASS ACTION.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					1. Holy Grail's Service Overview
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					The Holy Grail platform provides free educational resources.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					2. Eligibility
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					To use the Service, you must be in compliance with all applicable laws. By agreeing to
					these Terms, you represent that:
				</Text>
				<ul className="list-disc ml-6 mt-2 space-y-1 text-navy/80 dark:text-cream/80">
					<li>You have not been suspended or removed from the Service.</li>
					<li>
						Your registration and use of the Service comply with all applicable laws and
						regulations.
					</li>
				</ul>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					If you are using the Service on behalf of an organization, you confirm that you are
					authorized to bind that entity to these Terms.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					3. Accounts and Registration
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					To access some features of the Service, you must register for an account. You agree to
					provide accurate, complete, and current information when registering and to keep this
					information up to date. You are responsible for all activities occurring under your
					account. If you suspect unauthorized use of your account, you must notify us immediately
					at allthingsholygrail@gmail.com.
				</Text>
				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					4. Customer and Usage Data
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					<span className="font-semibold text-navy-deep dark:text-cream">Customer Data:</span> Any data, text, and other information,
					including but not limited to contact details such as email addresses,
					provided by you during your use of the Service is referred to as 'Customer Data.' Emails may be
					used for marketing purposes but will not be visible to other users.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					<span className="font-semibold text-navy-deep dark:text-cream">Usage Data:</span> We may collect performance, analytical, or
					usage data related to your use of the Service ('Usage Data'). This data will be anonymized
					and used to improve the Service. Usage Data will not include any Customer Data.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					5. Communications; Email
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may send you emails concerning our products and services, as well as those of third
					parties. You may opt out of promotional emails by following the unsubscribe instructions
					in the promotional email itself.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					6. Termination
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Holy Grail Team reserves the right to terminate or suspend your account at any time for
					any reason, including but not limited to violations of these Terms. Upon termination, you
					must cease all use of the Service, and any outstanding fees or obligations must be paid.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					7. Modifications to the Service
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We reserve the right to modify or discontinue any part of the Service at any time, without
					notice. We will not be liable to you for any modification, suspension, or discontinuation
					of the Service.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					8. Indemnity
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					You agree to indemnify and hold harmless Holy Grail Team from and against any claims,
					liabilities, damages, losses, and expenses, including legal fees, arising out of or in any
					way connected with your use of the Service or your violation of these Terms.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					9. Disclaimers and Limitation of Liability
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					The Service is provided 'as is,' and Holy Grail Team disclaims all warranties of any kind.
					We do not guarantee uninterrupted, secure, or error-free access to the Service. In no
					event shall Holy Grail Team be liable for any indirect, incidental, special, or
					consequential damages arising from the use of the Service.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					10. Dispute Resolution and Arbitration
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					All disputes will be resolved through binding arbitration in Singapore, in accordance with
					the Singapore Arbitration Act. By agreeing to these Terms, you waive the right to a trial
					by jury or participation in any class action or representative proceeding.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					11. Governing Law
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					These Terms shall be governed by and construed in accordance with the laws of Singapore,
					without regard to conflict of law principles.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					12. Changes to the Terms
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may update these Terms from time to time. If we make material changes, we will notify
					you by email or through the Service. Your continued use of the Service after changes are
					made constitutes your acceptance of the updated Terms.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-8 text-navy-deep dark:text-cream">
					13. Contact Information
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					If you have any questions about these Terms, you can contact us at:
				</Text>
				<div className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-navy/30 border border-navy/5 dark:border-cream/5">
					<Text className="font-semibold text-navy-deep dark:text-cream">Holy Grail Team</Text>
					<Text className="text-navy/70 dark:text-cream/70 mt-1">
						Email:{" "}
						<Link href="mailto:allthingsholygrail@gmail.com" className="text-amber hover:underline">
							allthingsholygrail@gmail.com
						</Link>
					</Text>
				</div>
			</section>
		</main>
	);
}
