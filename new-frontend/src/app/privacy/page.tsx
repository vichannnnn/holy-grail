export async function generateMetadata() {
  return {
    title: 'Privacy Policy - Holy Grail',
    description:
      'Learn how Holy Grail collects, uses, and protects your personal information. Our Privacy Policy explains the data we collect, how we use it.',
    openGraph: {
      title: 'Privacy Policy - Holy Grail',
      description:
        'Holy Grail respects your privacy. Read our Privacy Policy to understand how we collect, use, and share personal data on our platform.',
      images: [
        {
          url: '',
        },
      ],
    },
  };
}

const PrivacyPolicyPage = () => {
  return (
    <div className='min-h-screen mx-auto w-4/5 text-white p-8'>
      <h1 className='text-5xl font-bold mb-12'>Privacy Policy</h1>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6'>Introduction</h2>
        <p className='text-md leading-relaxed'>
          This privacy policy (“Privacy Policy”) applies to all visitors and users of the Hima
          Boilerplate web and mobile applications (collectively, “Holy Grail,” “App,” or “Apps”),
          which are offered by Holy Grail Team and/or any of its affiliates (“we,” or “us”). This
          Privacy Policy describes how we process your personal information, collect information
          through the use of cookies and related technologies, and how you can access and update
          your personal information. It also describes the data protection rights that may be
          available under your country&apos;s or state’s laws. Please read this Privacy Policy
          carefully. By accessing or using any part of the App, you acknowledge that you have been
          informed of and consent to our practices with regard to your personal information.
        </p>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6'>Applicability of this Privacy Policy</h2>
        <p className='text-md leading-relaxed'>
          This Privacy Policy applies to any personal information collected through Hima
          Boilerplate. It does not apply to personal information or other data that we process on
          behalf of our customers (collectively, “Customer Data”) as a service provider. We will
          only use Customer Data (including any personal information) to provide services to
          customers, and our use of your Customer Data will be governed by the terms of service or
          customer agreement between us and the customer.
        </p>
        <br />
        <p>
          If you are using the App as an employee, contractor, or representative of a customer,
          please contact the customer directly for privacy-related questions.
        </p>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6'>Personal Information We Collect</h2>
        <p className='text-md leading-relaxed'>
          You may choose to interact with our Apps in ways that provide us with your personal
          information. For example, when creating an account on Holy Grail, we collect information
          such as your name, email address, and phone number. We will also collect the information
          you provide with us in connection with creating an account on the App. In each case,
          FastAPI Boilerplate collects such personal information only insofar as is necessary or
          appropriate to fulfill the purpose of your interaction with or your request to Hima
          Boilerplate. We will not disclose your personal information other than as described in
          this Privacy Policy.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          Like most website operators, Holy Grail automatically collects technical information about
          your device, including your device’s IP address, device type, language settings, and
          general location information. This information is collected using cookies, web beacons,
          and related technologies to help us understand how visitors use our Apps, improve user
          experience, and monitor security.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          We may aggregate all information (including personal information) collected through our
          Apps for statistical purposes and share it with third parties in an anonymized form for
          our own promotional purposes.
        </p>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6'>Information Holy Grail Does Not Collect</h2>
        <p className='text-md leading-relaxed'>
          Holy Grail does not intentionally collect sensitive personal information, such as genetic
          data, biometric data for uniquely identifying a person, health information, or religious
          beliefs.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          We do not knowingly collect information from, or direct our App specifically to,
          individuals under the age of 16. If we discover that a user under the age of 16 has
          provided personal information, we will close the account.
        </p>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6'>
          Lawful Basis and Purposes for Processing Your Personal Information
        </h2>

        <p className='text-md leading-relaxed'>
          If you are located in Singapore, we collect and process your personal information in
          accordance with the <strong> Personal Data Protection Act (PDPA)</strong>. The legal bases
          depend on the services you use and how you use them. This means we collect and use your
          information only where it is necessary for legitimate business purposes or to fulfill
          legal obligations under the PDPA.
        </p>

        <h3 className='text-2xl font-semibold mb-4 mt-6'>Legitimate Interests</h3>
        <p className='text-md leading-relaxed'>
          We use your personal information for the following purposes, where such uses are necessary
          for our legitimate business operations:
        </p>
        <ul className='list-disc ml-6 mt-2'>
          <li>
            <p className='text-md leading-relaxed'>
              To improve and personalize your experience with Holy Grail and our Apps, and to tailor
              communications to you.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              To understand how you use our Apps and to develop new products, services, features,
              and functionality.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              To monitor and improve the performance of our products and services for
              administrative, security, and fraud prevention purposes.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              For internal functions, management and corporate reporting, and internal research and
              analytics.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              To enforce compliance with our terms of use and other policies, or otherwise in
              connection with legal claims, compliance, regulatory, and investigatory purposes,
              including disclosure of such information in connection with legal processes or
              litigation.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>To fulfill payments and transactions.</p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>To provide information about our services.</p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              To respond to your requests, questions, and feedback.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              For marketing and advertising purposes, including sending direct marketing emails, as
              permitted by law, such as notifying you of special promotions, offers, and events.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              To comply with applicable laws, lawful requests, and legal processes, such as
              responding to subpoenas or requests from government authorities.
            </p>
          </li>
        </ul>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>Consent</h3>
        <p className='text-md leading-relaxed'>
          We may rely on your consent in the following cases:
        </p>
        <ul className='list-disc ml-6 mt-2'>
          <li>
            <p className='text-md leading-relaxed'>
              Where you have expressly indicated your consent to the processing of your personal
              information (e.g., when you consent to receive marketing communications from us).
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              Where we have obtained your consent to place cookies or similar technologies.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              On other occasions where we ask for your consent, for the purpose we explain at the
              time.
            </p>
          </li>
        </ul>

        <p className='text-md leading-relaxed'>
          You may withdraw your consent at any time through the unsubscribe feature provided with
          the relevant marketing email or by contacting us using the details in the &quot;Contacting
          Holy Grail About Your Privacy&quot; section of this Privacy Policy.
        </p>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>
          How Holy Grail Uses and Protects Your Personal Information
        </h3>
        <p className='text-md leading-relaxed'>
          We may share your personal information with third parties in the following circumstances:
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Employees, Contractors, and Affiliates</h4>
        <p className='text-md leading-relaxed'>
          We share personal information with our employees, contractors, and affiliated
          organizations who need to know this information to process it on Holy Grail Team’s behalf
          or to provide services on the App. These parties are bound by confidentiality agreements.
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Service Providers and Partners</h4>
        <p className='text-md leading-relaxed'>
          Holy Grail Team engages the following third-party service providers to manage certain
          aspects of our business operations:
        </p>
        <ul className='list-disc ml-6 mt-2'>
          <li>
            <p className='text-md leading-relaxed'>
              Amazon Web Services – Cloud Infrastructure and Data Hosting
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              GitHub – Open-source repositories and internal project management tools
            </p>
          </li>
        </ul>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Professional Advisors</h4>
        <p className='text-md leading-relaxed'>
          We may disclose your personal information to professional advisors such as lawyers,
          bankers, auditors, and insurers, when necessary during the course of the professional
          services they provide.
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Business Transfers</h4>
        <p className='text-md leading-relaxed'>
          In the event of a merger, acquisition, or sale of assets, your personal information may be
          transferred to the acquiring entity, subject to this Privacy Policy.
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Legal Requirements</h4>
        <p className='text-md leading-relaxed'>
          We may disclose your personal information to government authorities if required by law or
          in the good faith belief that such action is necessary to comply with legal obligations,
          protect the rights and property of Holy Grail Team, or protect the personal safety of
          users or the public.
        </p>

        <p className='text-md leading-relaxed'>
          We take reasonable measures to protect your personal information from unauthorized access,
          use, or disclosure.
        </p>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>
          Holy Grail Team Communications With You
        </h3>
        <p className='text-md leading-relaxed'>
          If you provide your email address during account registration, we may occasionally send
          you communications regarding security updates, new features, and special offers. You may
          unsubscribe from marketing emails by following the instructions in those emails.
        </p>

        <h3 className='text-2xl font-semibold mb-4 mt-6'>Your Choices</h3>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Opt-out of Marketing Communications</h4>
        <p className='text-md leading-relaxed'>
          You can opt out of marketing-related emails by following the unsubscribe instructions in
          the emails we send you.
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Cookies</h4>
        <p className='text-md leading-relaxed'>
          You can manage your cookie settings through your browser. Rejecting cookies may limit the
          functionality of the App.
        </p>

        <h4 className='text-xl font-semibold mb-4 mt-6'>Online Tracking Opt-out</h4>
        <p className='text-md leading-relaxed'>
          You can opt out of tracking through browser settings or tools such as Privacy Badger or
          Ghostery. Some third-party ad networks allow you to opt out directly via their websites.
        </p>

        <h3 className='text-2xl font-semibold mb-4 mt-6'>
          Global Privacy Practices and Your Rights
        </h3>
        <p className='text-md leading-relaxed'>You may have rights such as:</p>
        <ul className='list-disc ml-6 mt-2'>
          <li>
            <p className='text-md leading-relaxed'>
              Right of Data Portability: Transfer your data to another service provider.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              Right to Withdraw Consent: If you have given consent for specific data processing
              activities, you may withdraw this consent at any time.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              Right of Erasure: Request the deletion of your personal data.
            </p>
          </li>
          <li>
            <p className='text-md leading-relaxed'>
              Right to Object to Processing: Object to the processing of your personal data for
              certain purposes, including direct marketing.
            </p>
          </li>
        </ul>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>Data Retention and Deletion</h3>
        <p className='text-md leading-relaxed'>
          Holy Grail Team will retain your personal information as long as your account is active or
          as needed to comply with legal obligations and fulfill our contractual commitments. You
          can access, update, or delete your account information by logging into your account.
        </p>
        <p className='text-md leading-relaxed'>
          In some cases, we may retain certain personal information indefinitely to maintain
          transactional integrity, particularly in relation to community posts, feedback, or other
          contributions.
        </p>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>Privacy Policy Changes</h3>
        <p className='text-md leading-relaxed'>
          Holy Grail Team may update this Privacy Policy from time to time. We will notify you of
          any significant changes by updating the date of this policy. Your continued use of the App
          after any changes constitutes your acceptance of the updated Privacy Policy.
        </p>
      </section>

      <section className='mb-12'>
        <h3 className='text-3xl font-semibold mb-4 mt-6'>
          Contacting Holy Grail Team About Your Privacy
        </h3>
        <p className='text-md leading-relaxed'>
          The relevant data controller for any personal information processed in connection with our
          Apps is Holy Grail Team
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          If you have any questions about this Privacy Policy or our privacy and security practices,
          or you wish to make a complaint about our compliance with applicable privacy laws, please
          feel free to contact us at grail@himaa.me.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          If you have questions or concerns about the way we are handling your personal information,
          or would like to exercise your privacy rights, please email us with the subject line
          &quot;Privacy Concern&quot; at grail@himaa.me.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          In most cases, we will respond within 30 days of receiving your message, but please note
          for the promptest response, we recommend emailing us.
        </p>
        <br />
        <p className='text-md leading-relaxed'>
          If you have questions about this Privacy Policy or our privacy practices, you can contact
          us at:
        </p>
        <p className='text-md leading-relaxed'>
          <br />
          <strong>Holy Grail Team</strong>
          <br />
          Email: grail@himaa.me
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
