import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../Forms/InputForm";
import BtnForm from "../../../Forms/BtnForm";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { authService } from "../../../../services/authService";
import HttpError from "../../../../errors/HttpError";
import LoadingPage from "../../../../pages/LoadingPage";
const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    const authorizeUser = (e) => {
        e.preventDefault();
        authService
            .login(email, password)
            .then((response) => {
                navigate("/todolist");
            })
            .catch((error) => {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        Swal.fire({
                            width: "30%",
                            title: "Error!",
                            text: "Usuário inexistente ou senha inválida",
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
                    console.log("error.errors:", error.errors);
                } else {
                    console.error("Unexpected Error! \n", error, error.status);
                }
            });
    };

    useEffect(() => {
        if (location.state?.isLogout) {
            Swal.fire({
                width: "30%",
                title: "Success",
                text: "Você saiu",
                icon: "success",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "!bg-gray-600 !text-white",
                    confirmButton:
                        "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                },
            }).then(() => navigate(location.pathname, { replace: true }));

            return;
        }

        if (location.state?.unauthorized) {
            Swal.fire({
                width: "30%",
                title: "Não autorizado!",
                text: location.state.unauthorized,
                icon: "info",
                confirmButtonText: "OK",
                buttonsStyling: false,
                customClass: {
                    popup: "!bg-gray-600 !text-white",
                    confirmButton:
                        "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                },
            }).then(() => navigate(location.pathname, { replace: true }));
        }
    }, [location, navigate]);

    return (
        <form
            className="flex flex-col items-center h-[70%] justify-evenly"
            action=""
            onSubmit={authorizeUser}
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
                />
                <Link
                    to={"#"}
                    className="underline xl:no-underline xl:hover:underline text-teal-50"
                >
                    Forgot your password?
                </Link>
            </div>

            <div className="flex flex-col items-center">
                <BtnForm content={"Enter"} />
                <Link
                    to={"/register"}
                    className="underline xl:no-underline xl:hover:underline text-sm text-teal-50 mt-2"
                >
                    Don't have an account? Register here.
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
