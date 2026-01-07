import React from "react";

const BtnForm = ({ content, onClickFunction }) => {
    return (
        <button
            onClick={onClickFunction}
            type="submit"
            className="cursor-pointer rounded bg-blue-600 text-amber-50 font-bold px-7 py-0.5 w-60 hover:bg-blue-500 transition-colors duration-300"
        >
            {content}
        </button>
    );
};

export default BtnForm;
