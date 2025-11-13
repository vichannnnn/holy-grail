import Link from 'next/link';

// import { AdBanner } from '@components/AdBanner';

import { generateFAQMetadata } from '@utils/metadata';

export const generateMetadata = generateFAQMetadata;

const FAQPage = () => {
  return (
    <div className='container mx-auto px-4 mt-16'>
      <div className='mb-8'>
        <h2 className='font-bold text-2xl mb-2'>Frequently Asked Questions</h2>
        <p className='mb-6'>
          Quick answers to questions you may have. Can&apos;t find what you&apos;re looking for?
          Send the administrators a message through the relevant channels.
        </p>
      </div>

      {/* <AdBanner
        imageUrl='https://image.himaa.me/PALLO_1.png'
        linkUrl='https://pallo.ai/?utm_source=grail&utm_content=b1'
        altText='Pallo.ai'
      /> */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col space-y-6'>
          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>What is the Holy Grail?</h3>
            <p>
              Holy Grail is a collaborative initiative undertaken by a group of students in
              Singapore to compile a repository of notes and practice papers to support fellow
              students in their academic journey.
              <br></br>
              <br></br>
              The aim of this project is to reduce the gap in resources between students and level
              the playing field for everyone on a national scale.
            </p>
          </div>

          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>How did the Holy Grail come about?</h3>
            <p>
              The project was initiated due to the absence of a suitable platform to store and
              access these educational resources.
              <br></br>
              <br></br>
              Initially stored in a collaborative Google Drive, a web application has since been
              developed to store and retrieve them much more conveniently and to make it more
              accessible, which is what you&apos;re seeing here now!
            </p>
          </div>

          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>How do I use the Holy Grail?</h3>
            <p>
              You can access the resources uploaded at the{' '}
              <Link href='/library' passHref>
                <span className='text-blue-600 hover:underline'>Library</span>
              </Link>{' '}
              above this section. Anyone is able to freely access these resources even without
              having an account.
            </p>
          </div>
        </div>

        <div className='flex flex-col space-y-6'>
          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>How can I contribute my materials?</h3>
            <p>
              You can upload the notes that you want to share over{' '}
              <Link href='/upload' passHref>
                <span className='text-blue-600 hover:underline cursor-pointer'>here</span>
              </Link>
              . Do note that you can only upload PDF files and you will need an account to start
              uploading your notes. They will only be available to the public after approval.
            </p>
          </div>

          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>Will the Holy Grail always be free?</h3>
            <p>
              Yes. The entire project and application is done out of initiative and will always be
              free. This means that content and resources such as contributed notes and practice
              papers will never be behind a paywall.
            </p>
          </div>

          <div className='faq-item'>
            <h3 className='font-bold text-lg mb-2'>
              How are you guys sustaining this project then?
            </h3>
            <p>
              Aside from free time spent in development for this project, we are currently incurring
              monthly costs such as infrastructure and hosting that is being paid from our own
              pocket thus far.
              <br></br>
              <br></br>
              With that being said, as of November 2023, we are collaborating with sponsors that are
              helping us with the costs in exchange for displaying advertisements for their
              services. The remainders will go into development effort for more features in the near
              future (circa 2024).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
