import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const TestimonialsSlider = () => {
  return (
    <div className="mt-10 mb-10">
      <div className="mt-5">
        <h1 className="text-4xl font-bold text-center text-orange-900">
          TESTIMONIALS
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 m-auto content-center justify-center items-center">
        {/* one */}
        <div>
          <Card className="mt-6 w-full h-[300px]">
            <CardBody>
              <img className="rounded-full w-[80px] h-[80px] " src="/people01.jpg" alt="" />
              <Typography variant="h3" color="blue-gray" className="mb-2">
              John Doe
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
              CEO at ExampleCorp
              </Typography>
              <Typography>
              ProQuestor provided excellent service and support. Our sales have improved dramatically thanks to their innovative strategies.
              </Typography>
            </CardBody>
          </Card>
        </div>


        {/* two */}

        <div>
          <Card className="mt-6 w-full h-[300px]">
            <CardBody>
              <img className="rounded-full w-[80px] h-[80px] " src="/people02.jpg" alt="" />
              <Typography variant="h3" color="blue-gray" className="mb-2">
              Jane Smith
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
              Marketing Director at ExampleInc
              </Typography>
              <Typography>
              The team at ProQuestor is fantastic! Their content creation and marketing strategies are top-notch.
              </Typography>
            </CardBody>
          </Card>
        </div>



        {/* three  */}

        <div>
          <Card className="mt-6 w-full h-[300px]">
            <CardBody>
              <img className="rounded-full w-[80px] h-[80px] " src="/people04.jpg" alt="" />
              <Typography variant="h3" color="blue-gray" className="mb-2">
              Michael Brown
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
              Freelancer
              </Typography>
              <Typography>
              I've never experienced such dedicated customer service. ProQuestor's support team is always there when I need them.
              </Typography>
            </CardBody>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default TestimonialsSlider;
