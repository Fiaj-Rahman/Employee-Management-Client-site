import { Spinner } from "@material-tailwind/react";


const Loading = () => {
    return (
        <div>
            <Spinner className="h-16 w-16 m-auto text-center mt-10 text-gray-900/50" />;
        </div>
    );
};

export default Loading;