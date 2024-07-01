import React from 'react';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Boosting Sales for ExampleCorp",
      description: "Implemented a comprehensive sales strategy that led to a 50% increase in sales within six months.",
      image: "/case01.jpg"
    },
    {
      title: "Enhancing Customer Support for ExampleInc",
      description: "Developed a customer support system that improved response times and satisfaction rates by 40%.",
      image: "case02.jpg"
    },
    {
      title: "Effective Content Marketing for ExampleAgency",
      description: "Created and executed a content marketing plan that increased website traffic by 30%.",
      image: "case03.png"
    }
  ];

  return (
    <div>
        <div>
            <h1 className='uppercase text-4xl font-bold text-center text-orange-900'>Case Studies</h1>
        </div>

<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 p-8">
      {caseStudies.map((caseStudy, index) => (
        <div key={index} className="p-4 border rounded shadow-lg">
          <img src={caseStudy.image} alt={caseStudy.title} className="mb-4 w-full h-48 object-cover" />
          <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
          <p>{caseStudy.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CaseStudies;
