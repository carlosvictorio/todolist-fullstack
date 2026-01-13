import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EditLogo from "../assets/edit-page.png";
import InputForm from "../components/Forms/InputForm";
import BtnForm from "../components/Forms/BtnForm";
import { Header } from "../components/Header/Header";
import { useAuth } from "../hooks/useAuth";
import userService from "../services/UserService";
import Swal from "sweetalert2";

const EditPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

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
            return;
        }

        Swal.fire({
            title: "Tem certeza que quer editar seus dados?",
            text: "Se confirmar não poderá voltar atrás!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, eu quero editar!",
        }).then((result) => {
            if (result.isConfirmed) {
                //settar User do Auth Provider
                userService
                    .updateMe({ name, email, password })
                    .then((response) => {
                        setUser(response);
                        Swal.fire({
                            width: "30%",
                            title: "Successo",
                            text: "Dados atualizados com sucesso!",
                            icon: "success",
                            confirmButtonText: "OK",
                            buttonsStyling: false,
                            customClass: {
                                popup: "!bg-gray-600 !text-white",
                                confirmButton:
                                    "!cursor-pointer !bg-blue-600 !text-amber-50 hover:!bg-blue-500 !transition-colors !duration-300 font-bold px-7 py-0.5 w-30",
                            },
                        }).then(() => navigate("/todolist"));
                    })
                    .catch((error) => console.error(error));
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="w-screen flex flex-1 p-4 justify-center items-center bg-blue-200">
                <div className="w-3/4 xl:w-1/4 border shadow-[0_5px_15px_rgba(0,0,0,0.35)] rounded-xl bg-gray-600 flex flex-col items-center">
                    <div className=" flex justify-center items-center m-3 ">
                        <img src={EditLogo} alt="Logo" />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className=" w-full flex flex-col items-center gap-4 "
                    >
                        <InputForm
                            type={"text"}
                            label={"Name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></InputForm>
                        <InputForm
                            type={"email"}
                            label={"E-mail"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></InputForm>
                        <div className="w-[80%] flex flex-col justify-between items-center gap-2.5">
                            <span className="w-[80%] border border-b-amber-100"></span>
                            <div className="flex justify-center items-center">
                                <h2 className="mr-2.5 font-bold text-white">
                                    Editar Senha?
                                </h2>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) =>
                                        setIsChecked(e.target.checked)
                                    }
                                    className="toggle"
                                />
                            </div>
                            <InputForm
                                type={"password"}
                                id={"password"}
                                label={"Password"}
                                disabled={!isChecked}
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
                                type={"password"}
                                id={"confirmPassword"}
                                label={"Confirm Password"}
                                disabled={!isChecked}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className={
                                    confirmPassword.length === 0
                                        ? ""
                                        : confirmPassword === password
                                        ? "border-green-500"
                                        : "border-red-600"
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1.5 mb-5">
                            <BtnForm content={"Editar"} />
                            <Link
                                to={"/todolist"}
                                className="cursor-pointer text-center rounded bg-gray-50 text-black font-bold px-7 py-0.5 w-60 hover:bg-gray-300 transition-colors duration-300"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
