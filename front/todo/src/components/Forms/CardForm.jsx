import React from "react";

const CardForm = ({ children }) => {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-blue-200">
            <div className="h-[70%] w-3/4  xl:h-[70%] xl:w-1/4 border shadow-[0_5px_15px_rgba(0,0,0,0.35)] rounded-xl bg-gray-600 flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default CardForm;
