import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import todoimg from "../../assets/todo.png";
import { useAuth } from "../../hooks/useAuth";
import perfil from "../../assets/perfil.png";

export const Header = ({ className }) => {
    const { logout } = useAuth();

    function logoutBtn() {
        Swal.fire({
            title: "Tem Certeza que quer sair?",
            text: "Terá que fazer login novamente para acessar suas tasks!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, eu quero sair!",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    }

    return (
        <div
            className={`bg-cyan-950 h-[10%] w-full flex justify-between items-center top-0 ${className}`}
        >
            <Link to="/todolist">
                <img src={todoimg} alt="logo" className="w-[70px] ml-5" />
            </Link>
            <div className="dropdown dropdown-left">
                <div
                    tabIndex={0}
                    role="button"
                    className=" mr-5 rounded-3xl ml-1.5 cursor-pointer"
                >
                    <div className="avatar cursor-pointer">
                        <div className="w-12 p-1 rounded-full bg-gray-300">
                            <img src={perfil} />
                        </div>
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                    <li>
                        <Link to="/editing">Editar</Link>
                    </li>
                    <li>
                        <button onClick={logoutBtn}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
