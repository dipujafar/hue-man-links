"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How can I upgrade, downgrade, or cancel my membership? ",
    answer:
      'You can easily adjust your membership by visiting the "Plan" section in your profile. To upgrade or downgrade, just edit your plan at any time. If you wish to cancel, you can do so at the bottom of your profile. Please note that cancellations take effect immediately, so we suggest canceling after your last scheduled sitting session',
  },
  {
    question: " What if my family and the link don’t click? ",
    answer:
      "We’re sorry to hear that! We aim to provide detailed profiles for each sitter to help you find the right match for your family. We have many linkers available, and we encourage you to try another one who may be a better fit. You can always mark any linker as a “Favorite” or as “Do not want again” for future bookings",
  },
  {
    question: "What should I do if there’s an issue with my link?",
    answer:
      "If an issue arises that you can’t resolve with the linker directly, please reach out to Rashida as soon as possible so we can discuss the situation. Additionally, you can opt to not book the linker again by selecting “Do not want again” under the booking details in your account.",
  },
  {
    question: " Can links help with tasks other than sitting?",
    answer:
      "Our links are here specifically for sitting services, so we kindly ask that you do not request them to do tasks unrelated to looking after your loved one. Their payment is based solely on sitting duties.",
  },
  {
    question: " How does Hue-man Links ensure the safety of my loved one?",
    answer:
      "We take safety very seriously. All of our linkers go through a thorough screening process, including background checks, and are required to have certifications in CPR and First Aid. We also encourage open communication between families and linkers about any specific instructions or concerns before each session.",
  },
  {
    question: " What is the cancellation policy?",
    answer:
      "To avoid cancellation fees, please cancel at least 48 hours before the scheduled session. If you cancel later than that, a fee may be charged since the linker has set aside time specifically for your family.",
  },
  {
    question: " What happens after I request a link?",
    answer:
      "Once you request a link, they will be notified via email. The linker has 48 hours to accept or decline the booking. If they accept, you’ll receive a confirmation email. If they’re unavailable, we’ll either find another linker for you or inform you so you can rebook, depending on your preference.",
  },
];
const Faqs = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };
  return (
    <div>
      <h1 className="lg:text-7xl text-3xl text-primary-blue text-center mt-5 md:mt-10">
        FAQs
      </h1>

      <div className="w-full max-w-6xl mx-auto lg:mt-16 mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className=" border-b-2 border-primary-black">
            <button
              className="flex gap-x-4 items-center w-full py-4 text-left transition-colors duration-200"
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.includes(index)}
              aria-controls={`faq-answer-${index}`}
            >
              {openItems.includes(index) ? (
                <ChevronUp className="h-7 w-7 text-primary-black font-bold" />
              ) : (
                <ChevronDown className="h-7 w-7 text-primary-black font-bold" />
              )}
              <span className="font-semibold  lg:text-2xl ">
                {faq.question}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.includes(index)
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-4 text-primary-black/85 lg:text-lg pl-7">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}

        <div className="  border-primary-black">
          <button
            className="flex gap-x-4 items-center w-full py-4 text-left transition-colors duration-200"
            onClick={() => toggleItem(faqs.length + 1)}
            aria-expanded={openItems.includes(faqs.length + 1)}
            aria-controls={`faq-answer-${faqs.length + 1}`}
          >
            {openItems.includes(faqs.length + 1) ? (
              <ChevronUp className="h-7 w-7 text-primary-black font-bold" />
            ) : (
              <ChevronDown className="h-7 w-7 text-primary-black font-bold" />
            )}
            <span className="font-semibold  lg:text-2xl">
              Can I still book a link if my loved one is sick?
            </span>
          </button>
          <div
            id={`faq-answer-${faqs.length + 1}`}
            className={`transition-all duration-300 ease-in-out ${
              openItems.includes(faqs.length + 1)
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="h-fit text-primary-black/85  pl-7 ">
              <p>
                We kindly ask that you avoid booking if your loved one is ill to
                ensure the health and safety of our caregivers. Please cancel
                any sessions if your child is experiencing the following
                symptoms:
              </p>
              <p>- Sore throat</p>
              <p>- Upset stomach</p>
              <p>- Fever (above 100°F)</p>
              <p>- Diarrhea</p>
              <p>- Ringworm</p>
              <p>- Hand, Foot, and Mouth disease</p>
              <p>- Discolored runny nose</p>
              <p>- Cough or congestion</p>
              <p>- Discharge from eyes, nose, or ears</p>
              <p>- Difficulty breathing</p>
              <p>- Any contagious illness</p>
              <p>
                Your loved one should be symptom-free (without the aid of
                medication) for at least 24 hours before scheduling a sitting
                session.
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
