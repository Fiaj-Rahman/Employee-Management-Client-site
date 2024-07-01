import React from 'react';
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';

const ContactUs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync, isLoading } = useMutation(
    {
      mutationFn: async (messageData) => {
        const { data } = await axiosSecure.post('/message', messageData);
        return data;
      },
      onSuccess: () => {
        toast.success("Your message has been sent successfully");
      },
      onError: () => {
        toast.error("Failed to send your message");
      }
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const messageData = { email, message };
      await mutateAsync(messageData);
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className='text-4xl text-center font-bold mt-5 mb-5'>CONTACT US</div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea name='message' className="form-control border rounded-sm form-control-lg" rows="5" cols="35" placeholder="Message" required></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
