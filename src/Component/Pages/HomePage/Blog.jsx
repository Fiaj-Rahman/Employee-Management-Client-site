import React from 'react';

const Blog = () => {
  const posts = [
    {
      title: "Top Sales Strategies for 2024",
      description: "Explore the latest trends and strategies in sales to boost your performance.",
      date: "June 1, 2024",
      image: "blog01.jpg"
    },
    {
      title: "Content Marketing Tips for Small Businesses",
      description: "Learn how to effectively market your small business with these content tips.",
      date: "May 20, 2024",
      image: "blog02.png"
    },
    {
      title: "Improving Customer Support Efficiency",
      description: "Discover ways to enhance your customer support processes and increase satisfaction.",
      date: "May 10, 2024",
      image: "blog03.jpg"
    }
  ];

  return (
    <div>

<div>
            <h1 className='uppercase text-4xl font-bold text-center text-orange-900'>BLOG</h1>
        </div>


<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 p-8">
      {posts.map((post, index) => (
        <div key={index} className="p-4 border rounded shadow-lg">
          <img src={post.image} alt={post.title} className="mb-4 w-full h-48 object-cover" />
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-500 mb-2">{post.date}</p>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Blog;
