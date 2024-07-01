import { Carousel, Typography, Button } from "@material-tailwind/react";
 
const Slider = () => {
    return (
        <div>
            <Carousel className="rounded-xl h-[600px] mt-10 mb-10 autoplay loop autoplayDelay transition" >
      
            <div className="relative h-full w-full">
        <img
          src="/slider01.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Connecting Talent Worldwide
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              ProQuestor bridges the gap between clients and freelancers across the globe.
            </Typography>
            
          </div>
        </div>
      </div>
      
      
      
      <div className="relative h-full w-full">
        <img
          src="/slider04.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
             Join Our Network of Skilled Professionals
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              A diverse group of freelancers celebrating their achievements
            </Typography>
            
          </div>
        </div>
      </div>


      <div className="relative h-full w-full">
        <img
          src="/slider02.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Meet Our Experts
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Our team of seasoned professionals is dedicated to delivering top-notch services.
            </Typography>
           
          </div>
        </div>
      </div>


      <div className="relative h-full w-full">
        <img
          src="/slider03.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Your One-Stop Solution for All Services
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Web Development, Graphic Design, Digital Marketing, and more.
            </Typography>
           
          </div>
        </div>
      </div>
    </Carousel>
        </div>
    );
};

export default Slider;