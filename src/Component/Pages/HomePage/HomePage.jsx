
import Slider from './Slider';
import Services from './Services';
import TestimonialsSlider from './TestimonialsSlider ';
import CaseStudies from './CaseStudies';
import Blog from './Blog';

const HomePage = () => {
    return (
        <div>
            <Slider></Slider>
            <Services></Services>
            <TestimonialsSlider></TestimonialsSlider>
            <CaseStudies></CaseStudies>
            <Blog></Blog>
        </div>
    );
};

export default HomePage;