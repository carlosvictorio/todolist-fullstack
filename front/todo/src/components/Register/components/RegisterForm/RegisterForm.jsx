import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../Forms/InputForm";
import BtnForm from "../../../Forms/BtnForm";
import { useState } from "react";
import { authService } from "../../../../services/authService";
import HttpError from "../../../../errors/HttpError";
import Swal from "sweetalert2";

const RegisterForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const sendUserData = (e) => {
        e.preventDefault();

        console.log(email, password);

        if (password !== confirmPassword) {
            Swal.fire({
                width: "30%",
                title: "Error!",
                text: "Confirme sua senha!",
                icon: "error",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "!bg-gray-600 !text-white",
                    confirmButton:
                        "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                },
            });
        }

        authService
            .register(email, password)
            .then((response) => {
                console.log("User registered! ", response);
                Swal.fire({
                    width: "30%",
                    title: "Success",
                    text: "Cadastro realizado com sucesso! \n Faça login.",
                    icon: "success",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                        popup: "!bg-gray-600 !text-white",
                        confirmButton:
                            "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                    },
                }).then(() => navigate("/login"));
            })
            .catch((error) => {
                if (error instanceof HttpError) {
                    if (error.status === 409) {
                        Swal.fire({
                            width: "30%",
                            title: "Error!",
                            text: error.message,
                            icon: "error",
                            confirmButtonText: "OK",
                            buttonsStyling: false,
                            customClass: {
                                popup: "!bg-gray-600 !text-white",
                                confirmButton:
                                    "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                            },
                        });
                    }

                    console.log(
                        ` STATUS CODE:${error.status}\n ERROR:${error.message} \n`
                    );
                } else {
                    console.error("Unexpected Error! \n", error);
                }
            });
    };

    return (
        <form
            className="flex flex-col items-center h-[70%] justify-evenly"
            action=""
            onSubmit={sendUserData}
        >
            <div className="flex flex-col items-center gap-4">
                <InputForm
                    type={"text"}
                    id={"email"}
                    label={"E-mail"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                    type={"password"}
                    id={"password"}
                    label={"Password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className={
                        confirmPassword.length === 0
                            ? ""
                            : confirmPassword === password
                            ? "border-green-500"
                            : ""
                    }
                />
                <InputForm
                    className={
                        confirmPassword.length === 0
                            ? ""
                            : confirmPassword === password
                            ? "border-green-500"
                            : "border-red-600"
                    }
                    type={"password"}
                    id={"confirmPassword"}
                    label={"Confirm Password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="flex flex-col items-center">
                <BtnForm content={"Cadastrar"} />
                <Link
                    to={"/login"}
                    className="text-sm hover:underline text-teal-50 mt-2"
                >
                    Already have an account? Log in here.
                </Link>
            </div>
        </form>
    );
};

export default RegisterForm;
