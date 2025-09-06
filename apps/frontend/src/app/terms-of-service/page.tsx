import Link from "next/link";

import { generateTermsOfServiceMetadata } from "@utils/metadata";
import { Showcase } from "@components/Showcase";

export const generateMetadata = generateTermsOfServiceMetadata;

const TermsOfServicePage = () => {
	return (
		<div className="min-h-screen mx-auto w-4/5 text-white p-8">
			<section className="mb-12">
				<h2 className="text-5xl font-semibold mb-6">Terms of Service</h2>
				<Showcase />

				<p className="text-md leading-relaxed">
					Welcome, and thank you for your interest in <strong>Holy Grail Team</strong> (&apos;Holy
					Grail Team,&apos; &apos;we,&apos; or &apos;us&apos;) and our mobile and web application{" "}
					<strong>Holy Grail</strong>, along with our related services (collectively, the
					&apos;Service&apos;). These Terms of Service, including Holy Grail Team&apos;s Privacy
					Policy (available
					<Link href="/privacy" passHref>
						here
					</Link>
					), (together, these &apos;Terms&apos;) are a legally binding contract between you and Holy
					Grail Team regarding your use of the Service.
				</p>

				<p className="text-md leading-relaxed">
					PLEASE READ THE FOLLOWING TERMS CAREFULLY: BY CLICKING &quot;I ACCEPT,&quot; SIGNING AN
					ORDER FORM THAT REFERENCES THESE TERMS, OR BY DOWNLOADING, INSTALLING, OR OTHERWISE
					ACCESSING OR USING THE SERVICE, YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD, AND, AS A
					CONDITION TO YOUR USE OF THE SERVICE, YOU AGREE TO BE BOUND BY, THESE TERMS. IF YOU ARE
					NOT ELIGIBLE OR DO NOT AGREE TO THESE TERMS, THEN YOU DO NOT HAVE OUR PERMISSION TO USE
					THE SERVICE. YOUR USE OF THE SERVICE AND HOLY GRAIL TEAM&apos;S PROVISION OF THE SERVICE
					TO YOU CONSTITUTES AN AGREEMENT BY BOTH PARTIES TO BE BOUND BY THESE TERMS.
				</p>

				<p className="text-md leading-relaxed">
					If you are using the Service on behalf of an organization, the individual accepting these
					Terms on the organization’s behalf represents that they have the authority to bind the
					organization to these Terms.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">
					NOTICE OF ARBITRATION AND CLASS ACTION WAIVER
				</h3>
				<p className="text-md leading-relaxed">
					Except for certain disputes described in Section 15, you agree that disputes arising under
					these Terms will be resolved by binding, individual arbitration, and BY ACCEPTING THESE
					TERMS, YOU AND HOLY GRAIL TEAM WAIVE THE RIGHT TO A TRIAL BY JURY OR PARTICIPATION IN A
					CLASS ACTION.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">1. Holy Grail&apos;s Service Overview</h3>
				<p className="text-md leading-relaxed">
					The Holy Grail platform provides free educational resources.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">2. Eligibility</h3>
				<p className="text-md leading-relaxed">
					To use the Service, you must be at least 16 years old and in compliance with all
					applicable laws. By agreeing to these Terms, you represent that:
				</p>
				<ul className="list-disc ml-6 mt-2">
					<li>You are at least 16 years old.</li>
					<li>You have not been suspended or removed from the Service.</li>
					<li>
						Your registration and use of the Service comply with all applicable laws and
						regulations.
					</li>
				</ul>
				<p className="text-md leading-relaxed">
					If you are using the Service on behalf of an organization, you confirm that you are
					authorized to bind that entity to these Terms.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">3. Accounts and Registration</h3>
				<p className="text-md leading-relaxed">
					To access some features of the Service, you must register for an account. You agree to
					provide accurate, complete, and current information when registering and to keep this
					information up to date. You are responsible for all activities occurring under your
					account. If you suspect unauthorized use of your account, you must notify us immediately
					at grail@himaa.me.
				</p>

				{/*<h3 className='text-2xl font-semibold mb-4 mt-6'>4. Payment Terms</h3>*/}
				{/*<p className='text-md leading-relaxed'>*/}
				{/*  Certain features of the Service require payment. Payments are processed exclusively*/}
				{/*  through Stripe, and we do not store your payment details. By agreeing to these Terms, you*/}
				{/*  agree to be bound by Stripe&quot;s terms (available at:*/}
				{/*  <Link href='https://stripe.com/legal' passHref>*/}
				{/*    https://stripe.com/legal*/}
				{/*  </Link>*/}
				{/*  ).*/}
				{/*</p>*/}
				{/*<p className='text-md leading-relaxed'>*/}
				{/*  We offer both lifetime payment options and recurring subscription plans. You can review*/}
				{/*  and accept the fees before proceeding with payment. All fees are non-refundable unless*/}
				{/*  otherwise stated by law.*/}
				{/*</p>*/}

				{/*<h3 className='text-2xl font-semibold mb-4 mt-6'>5. Subscription Service</h3>*/}
				{/*<p className='text-md leading-relaxed'>*/}
				{/*  If you select a subscription service, it will automatically renew unless canceled. Your*/}
				{/*  subscription will be billed according to the subscription plan you choose, either as a*/}
				{/*  lifetime payment or a recurring payment. You must cancel the subscription before the*/}
				{/*  renewal date to avoid being charged for the next billing period. For cancellation, please*/}
				{/*  use the billing menu or contact us at grail@himaa.me.*/}
				{/*</p>*/}

				<h3 className="text-2xl font-semibold mb-4 mt-6">6. Customer and Usage Data</h3>
				<p className="text-md leading-relaxed">
					<strong>Customer Data:</strong> Any data, text, and other information, including but not
					limited to contact details such as email addresses and phone numbers, provided by you
					during your use of the Service is referred to as &quot;Customer Data.&quot; Tutors&apos;
					phone numbers will only be shown to accounts with verified email addresses. Emails may be
					used for marketing purposes but will not be visible to other users.
				</p>
				<p className="text-md leading-relaxed">
					<strong>Usage Data:</strong> We may collect performance, analytical, or usage data related
					to your use of the Service (&quot;Usage Data&quot;). This data will be anonymized and used
					to improve the Service. Usage Data will not include any Customer Data.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">7. Communications; Email</h3>
				<p className="text-md leading-relaxed">
					We may send you emails concerning our products and services, as well as those of third
					parties. You may opt out of promotional emails by following the unsubscribe instructions
					in the promotional email itself.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">8. Termination</h3>
				<p className="text-md leading-relaxed">
					Holy Grail Team reserves the right to terminate or suspend your account at any time for
					any reason, including but not limited to violations of these Terms. Upon termination, you
					must cease all use of the Service, and any outstanding fees or obligations must be paid.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">9. Modifications to the Service</h3>
				<p className="text-md leading-relaxed">
					We reserve the right to modify or discontinue any part of the Service at any time, without
					notice. We will not be liable to you for any modification, suspension, or discontinuation
					of the Service.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">10. Indemnity</h3>
				<p className="text-md leading-relaxed">
					You agree to indemnify and hold harmless Holy Grail Team from and against any claims,
					liabilities, damages, losses, and expenses, including legal fees, arising out of or in any
					way connected with your use of the Service or your violation of these Terms.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">
					11. Disclaimers and Limitation of Liability
				</h3>
				<p className="text-md leading-relaxed">
					The Service is provided &quot;as is,&quot; and Holy Grail Team disclaims all warranties of
					any kind. We do not guarantee uninterrupted, secure, or error-free access to the Service.
					In no event shall Holy Grail Team be liable for any indirect, incidental, special, or
					consequential damages arising from the use of the Service.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">12. Dispute Resolution and Arbitration</h3>
				<p className="text-md leading-relaxed">
					All disputes will be resolved through binding arbitration in Singapore, in accordance with
					the Singapore Arbitration Act. By agreeing to these Terms, you waive the right to a trial
					by jury or participation in any class action or representative proceeding.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">13. Governing Law</h3>
				<p className="text-md leading-relaxed">
					These Terms shall be governed by and construed in accordance with the laws of Singapore,
					without regard to conflict of law principles.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">14. Changes to the Terms</h3>
				<p className="text-md leading-relaxed">
					We may update these Terms from time to time. If we make material changes, we will notify
					you by email or through the Service. Your continued use of the Service after changes are
					made constitutes your acceptance of the updated Terms.
				</p>

				<h3 className="text-2xl font-semibold mb-4 mt-6">15. Contact Information</h3>
				<p className="text-md leading-relaxed">
					If you have any questions about these Terms, you can contact us at:
				</p>
				<p className="text-md leading-relaxed">
					<br />
					<strong>Holy Grail Team</strong>
					<br />
					Email: grail@himaa.me
				</p>
			</section>
		</div>
	);
};

export default TermsOfServicePage;
