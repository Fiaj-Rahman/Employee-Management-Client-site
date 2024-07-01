
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';
import Nav from '../Navbar/Nav';






const Router = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>


    //     <div>
    //     <Navbar />
    //     <div className='pt-24 min-h-[calc(100vh-68px)]'>
    //       <Outlet />
    //     </div>
    //     <Footer />
    //   </div>
    );
};

export default Router;