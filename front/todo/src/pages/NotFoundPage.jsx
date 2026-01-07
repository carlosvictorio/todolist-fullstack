import React from "react";
import Alerta from "../assets/alerta.png";

const NotFoundPage = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-amber-100">
            <div className="border-2 bg-blue-300 border-notfound rounded h-20 w-96 flex justify-center gap-3 items-center relative shadow-xl">
                <h1 className="font-extrabold text-border text-notfound text-2xl">
                    Page Not Found!
                </h1>
                <img
                    className="w-[60px] absolute right-5"
                    src={Alerta}
                    alt=""
                    srcset=""
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
