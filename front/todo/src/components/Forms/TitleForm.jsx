import React from "react";
import Logo from "../../assets/todo.png";

const TitleForm = ({ title }) => {
    return (
        <div className="flex flex-col items-center h-[10%] justify-center w-60">
            <img src={Logo} alt="" className="w-[50px]" />
            <h1 className="font-bold text-amber-50 text-2xl">{title}</h1>
        </div>
    );
};

export default TitleForm;
