import Link from "next/link";
import { Title, Text } from "@shared/ui/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy - Holy Grail",
	description:
		"Learn how Holy Grail collects, uses, and protects your personal information. Our Privacy Policy explains the data we collect, how we use it.",
	openGraph: {
		title: "Privacy Policy - Holy Grail",
		description:
			"Holy Grail respects your privacy. Read our Privacy Policy to understand how we collect, use, and share personal data on our platform.",
		images: [
			{
				url: "",
			},
		],
	},
};

export default function PrivacyPolicyPage() {
	return (
		<main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
			<Title order={1} className="text-3xl md:text-4xl font-bold mb-8 text-navy-deep dark:text-cream">
				Privacy Policy
			</Title>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Introduction
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					This privacy policy ("Privacy Policy") applies to all visitors and users of the Holy
					Grail web and mobile applications (collectively, "Holy Grail," "App," or "Apps"),
					which are offered by Holy Grail Team and/or any of its affiliates ("we," or "us"). This
					Privacy Policy describes how we process your personal information, collect information
					through the use of cookies and related technologies, and how you can access and update
					your personal information. It also describes the data protection rights that may be
					available under your country's or state's laws. Please read this Privacy Policy carefully.
					By accessing or using any part of the App, you acknowledge that you have been informed of
					and consent to our practices with regard to your personal information.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Applicability of this Privacy Policy
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					This Privacy Policy applies to any personal information collected through Holy
					Grail. It does not apply to personal information or other data that we process on
					behalf of our customers (collectively, "Customer Data") as a service provider. We will
					only use Customer Data (including any personal information) to provide services to
					customers, and our use of your Customer Data will be governed by the terms of service or
					customer agreement between us and the customer.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					If you are using the App as an employee, contractor, or representative of a customer,
					please contact the customer directly for privacy-related questions.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Personal Information We Collect
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					You may choose to interact with our Apps in ways that provide us with your personal
					information. For example, when creating an account on Holy Grail, we collect information
					such as your email address. We will also collect the information you provide with us in
					connection with creating an account on the App. In each case, Holy Grail collects such
					personal information only in so far as is necessary or appropriate to fulfill the purpose
					of your interaction with or your request to Holy Grail. We will not disclose your personal
					information other than as described in this Privacy Policy.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					Like most website operators, Holy Grail automatically collects technical information about
					your device, including your device's IP address, device type, language settings, and
					general location information. This information is collected using cookies, web beacons,
					and related technologies to help us understand how visitors use our Apps, improve user
					experience, and monitor security.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					We may aggregate all information (including personal information) collected through our
					Apps for statistical purposes and share it with third parties in an anonymized form for
					our own promotional purposes.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Information Holy Grail Does Not Collect
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Holy Grail does not intentionally collect sensitive personal information, such as genetic
					data, biometric data for uniquely identifying a person, health information, or religious
					beliefs.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Lawful Basis and Purposes for Processing Your Personal Information
				</Title>

				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					If you are located in Singapore, we collect and process your personal information in
					accordance with the <span className="font-semibold text-navy-deep dark:text-cream">Personal Data Protection Act (PDPA)</span>
					. The legal bases depend on the services you use and how you use them. This means we
					collect and use your information only where it is necessary for legitimate business
					purposes or to fulfill legal obligations under the PDPA.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-6 text-navy-deep dark:text-cream">
					Legitimate Interests
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We use your personal information for the following purposes, where such uses are necessary
					for our legitimate business operations:
				</Text>
				<ul className="list-disc ml-6 mt-3 space-y-2 text-navy/80 dark:text-cream/80">
					<li>To improve and personalize your experience with Holy Grail and our Apps, and to tailor communications to you.</li>
					<li>To understand how you use our Apps and to develop new products, services, features, and functionality.</li>
					<li>To monitor and improve the performance of our products and services for administrative, security, and fraud prevention purposes.</li>
					<li>For internal functions, management and corporate reporting, and internal research and analytics.</li>
					<li>To enforce compliance with our terms of use and other policies, or otherwise in connection with legal claims, compliance, regulatory, and investigatory purposes.</li>
					<li>To fulfill payments and transactions.</li>
					<li>To provide information about our services.</li>
					<li>To respond to your requests, questions, and feedback.</li>
					<li>For marketing and advertising purposes, including sending direct marketing emails, as permitted by law.</li>
					<li>To comply with applicable laws, lawful requests, and legal processes.</li>
				</ul>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Consent
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may rely on your consent in the following cases:
				</Text>
				<ul className="list-disc ml-6 mt-3 space-y-2 text-navy/80 dark:text-cream/80">
					<li>Where you have expressly indicated your consent to the processing of your personal information (e.g., when you consent to receive marketing communications from us).</li>
					<li>Where we have obtained your consent to place cookies or similar technologies.</li>
					<li>On other occasions where we ask for your consent, for the purpose we explain at the time.</li>
				</ul>

				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					You may withdraw your consent at any time through the unsubscribe feature provided with
					the relevant marketing email or by contacting us using the details in the 'Contacting Holy
					Grail About Your Privacy' section of this Privacy Policy.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					How Holy Grail Uses and Protects Your Personal Information
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may share your personal information with third parties in the following circumstances:
				</Text>

				<Title order={3} className="text-lg font-semibold mb-2 mt-6 text-navy-deep dark:text-cream">
					Employees, Contractors, and Affiliates
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We share personal information with our employees, contractors, and affiliated
					organizations who need to know this information to process it on Holy Grail Team's behalf
					or to provide services on the App. These parties are bound by confidentiality agreements.
				</Text>

				<Title order={3} className="text-lg font-semibold mb-2 mt-6 text-navy-deep dark:text-cream">
					Service Providers and Partners
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Holy Grail Team engages the following third-party service providers to manage certain
					aspects of our business operations:
				</Text>
				<ul className="list-disc ml-6 mt-3 space-y-2 text-navy/80 dark:text-cream/80">
					<li>Amazon Web Services – Cloud Infrastructure and Data Hosting</li>
					<li>GitHub – Open-source repositories and internal project management tools</li>
				</ul>

				<Title order={3} className="text-lg font-semibold mb-2 mt-6 text-navy-deep dark:text-cream">
					Professional Advisors
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may disclose your personal information to professional advisors such as lawyers,
					bankers, auditors, and insurers, when necessary during the course of the professional
					services they provide.
				</Text>

				<Title order={3} className="text-lg font-semibold mb-2 mt-6 text-navy-deep dark:text-cream">
					Business Transfers
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					In the event of a merger, acquisition, or sale of assets, your personal information may be
					transferred to the acquiring entity, subject to this Privacy Policy.
				</Text>

				<Title order={3} className="text-lg font-semibold mb-2 mt-6 text-navy-deep dark:text-cream">
					Legal Requirements
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					We may disclose your personal information to government authorities if required by law or
					in the good faith belief that such action is necessary to comply with legal obligations,
					protect the rights and property of Holy Grail Team, or protect the personal safety of
					users or the public.
				</Text>

				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					We take reasonable measures to protect your personal information from unauthorized access,
					use, or disclosure.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Holy Grail Team Communications With You
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					If you provide your email address during account registration, we may occasionally send
					you communications regarding security updates, new features, and special offers. You may
					unsubscribe from marketing emails by following the instructions in those emails.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-6 text-navy-deep dark:text-cream">
					Your Choices
				</Title>

				<Title order={4} className="text-lg font-semibold mb-2 mt-4 text-navy-deep dark:text-cream">
					Opt-out of Marketing Communications
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					You can opt out of marketing-related emails by following the unsubscribe instructions in
					the emails we send you.
				</Text>

				<Title order={4} className="text-lg font-semibold mb-2 mt-4 text-navy-deep dark:text-cream">
					Cookies
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					You can manage your cookie settings through your browser. Rejecting cookies may limit the
					functionality of the App.
				</Text>

				<Title order={4} className="text-lg font-semibold mb-2 mt-4 text-navy-deep dark:text-cream">
					Online Tracking Opt-out
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					You can opt out of tracking through browser settings or tools such as Privacy Badger or
					Ghostery. Some third-party ad networks allow you to opt out directly via their websites.
				</Text>

				<Title order={3} className="text-xl font-semibold mb-3 mt-6 text-navy-deep dark:text-cream">
					Global Privacy Practices and Your Rights
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">You may have rights such as:</Text>
				<ul className="list-disc ml-6 mt-3 space-y-2 text-navy/80 dark:text-cream/80">
					<li><span className="font-semibold text-navy-deep dark:text-cream">Right of Data Portability:</span> Transfer your data to another service provider.</li>
					<li><span className="font-semibold text-navy-deep dark:text-cream">Right to Withdraw Consent:</span> If you have given consent for specific data processing activities, you may withdraw this consent at any time.</li>
					<li><span className="font-semibold text-navy-deep dark:text-cream">Right of Erasure:</span> Request the deletion of your personal data.</li>
					<li><span className="font-semibold text-navy-deep dark:text-cream">Right to Object to Processing:</span> Object to the processing of your personal data for certain purposes, including direct marketing.</li>
				</ul>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Data Retention and Deletion
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Holy Grail Team will retain your personal information as long as your account is active or
					as needed to comply with legal obligations and fulfill our contractual commitments. You
					can access, update, or delete your account information by logging into your account.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					In some cases, we may retain certain personal information indefinitely to maintain
					transactional integrity, particularly in relation to community posts, feedback, or other
					contributions.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Privacy Policy Changes
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					Holy Grail Team may update this Privacy Policy from time to time. We will notify you of
					any significant changes by updating the date of this policy. Your continued use of the App
					after any changes constitutes your acceptance of the updated Privacy Policy.
				</Text>
			</section>

			<section className="mb-10">
				<Title order={2} className="text-2xl font-semibold mb-4 text-navy-deep dark:text-cream">
					Contacting Holy Grail Team About Your Privacy
				</Title>
				<Text className="leading-relaxed text-navy/80 dark:text-cream/80">
					The relevant data controller for any personal information processed in connection with our
					Apps is Holy Grail Team.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					If you have any questions about this Privacy Policy or our privacy and security practices,
					or you wish to make a complaint about our compliance with applicable privacy laws, please
					feel free to contact us at allthingsholygrail@gmail.com.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					If you have questions or concerns about the way we are handling your personal information,
					or would like to exercise your privacy rights, please email us with the subject line
					'Privacy Concern' at allthingsholygrail@gmail.com.
				</Text>
				<Text className="leading-relaxed mt-4 text-navy/80 dark:text-cream/80">
					In most cases, we will respond within 30 days of receiving your message, but please note
					for the promptest response, we recommend emailing us.
				</Text>

				<div className="mt-6 p-4 rounded-xl bg-white/50 dark:bg-navy/30 border border-navy/5 dark:border-cream/5">
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
