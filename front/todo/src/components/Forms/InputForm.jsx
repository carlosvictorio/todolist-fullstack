import OpenEye from "../../assets/eye.png";
import ClosedEye from "../../assets/eye-hide.png";
import { useState } from "react";
const InputForm = ({
    type,
    id,
    label,
    value,
    onChange,
    disabled,
    className,
}) => {
    const [hidePsw, setHidePsw] = useState(type);

    if (id == "password") {
        function HandleHide(e) {
            e.preventDefault();
            setHidePsw((prev) => (prev === "password" ? "text" : "password"));
        }

        return (
            <div className="relative w-60 flex items-center">
                <input
                    id={id}
                    type={hidePsw}
                    onChange={onChange}
                    required
                    disabled={disabled}
                    placeholder=" "
                    value={value}
                    className={`
                    peer
                    w-full h-8 px-3 rounded-md
                    border border-amber-50 bg-gray-600
                    text-amber-50 outline-none
                    focus:border-2
                    valid:border-2
                    ${className}`}
                />
                <button
                    onClick={HandleHide}
                    className="absolute right-0 w-[25px] mr-2 cursor-pointer"
                >
                    <img
                        src={hidePsw == `password` ? OpenEye : ClosedEye}
                        alt=""
                    />
                </button>

                <label
                    htmlFor={id}
                    type="button"
                    className="
                    absolute left-2
                    top-1/2 -translate-y-1/2 
                    px-0.5 bg-gray-600 
                    text-amber-50 text-[0.9rem] leading-none
                    pointer-events-none
                    z-10

                    transition-[top,transform,font-size] duration-200 ease-out
                    will-change-transform

                    peer-focus:top-1
                    peer-focus:-translate-y-3
                    peer-focus:text-sm
                    peer-focus:font-bold

                    peer-valid:top-1
                    peer-valid:-translate-y-3
                    peer-valid:text-sm
                    peer-valid:font-bold
                    "
                >
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div className="relative w-60">
            <input
                id={id}
                type={type}
                onChange={onChange}
                required
                disabled={disabled}
                placeholder=" "
                value={value}
                className={`
                    peer
                    w-full h-8 px-3 rounded-md
                    border border-amber-50 bg-gray-600
                    text-amber-50 outline-none
                    focus:border-2
                    valid:border-2
                    ${id == "confirmPassword" ? className : ""}
                    `}
            />

            <label
                htmlFor={id}
                className="
                    absolute left-2
                    top-1/2 -translate-y-1/2 
                    px-0.5 bg-gray-600 
                    text-amber-50 text-[0.9rem] leading-none
                    pointer-events-none
                    z-10

                    transition-[top,transform,font-size] duration-200 ease-out
                    will-change-transform

                    peer-focus:top-1
                    peer-focus:-translate-y-3
                    peer-focus:text-sm
                    peer-focus:font-bold

                    peer-valid:top-1
                    peer-valid:-translate-y-3
                    peer-valid:text-sm
                    peer-valid:font-bold
                    "
            >
                {label}
            </label>
        </div>
    );
};

export default InputForm;
