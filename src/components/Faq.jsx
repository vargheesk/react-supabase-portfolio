import React from 'react';

const Faq = ({ faqs }) => {
  return (
    <section id="faq" className="py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text */}
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">FAQs</p>
            <h2 className="text-4xl font-bold my-4 text-gray-800">Answers to common questions</h2>
            <p className="text-lg mb-6">Here to help you understand the process and how we can work together.</p>
            <a href="#contact" className="btn-hire inline-block px-6 py-3 font-semibold">Email Me</a>
          </div>
          {/* Right Column: Accordion */}
          <div className="faq-container">
            {faqs && faqs.map((faq) => (
              <details key={faq.id} className="faq-item">
                <summary>{faq.question} <span className="plus-icon text-2xl font-light">+</span></summary>
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
