import { useEffect, useState } from "react";
import Trash from "../assets/bin.png";
import EditIcon from "../assets/edit-icon-48.png";
import Ok from "../assets/ok.png";
import Swal from "sweetalert2";
import taskService from "../services/TaskService";
import { Header } from "../components/Header/Header";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        taskService
            .getMyTasks()
            .then((response) => setTasks(response))
            .catch((error) => console.error(error));
    }, []);

    function handleEditing(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id == id ? { ...task, editing: !task.editing } : task
            )
        );
    }

    function handleTextEdit(id, text) {
        if (text.trim().length >= 100) {
            Swal.fire("Descreva o que fazer com no máximo 100 caracteres!!");
            return;
        }
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id == id ? { ...task, name: text } : task
            )
        );
    }

    function editOk(id, text) {
        taskService
            .updateTaskName(id, text)
            .catch((error) => console.error(error));
    }

    async function handleTask(e) {
        e.preventDefault();
        const taskName = e.target.newTask.value;

        const response = await taskService.createTask(taskName);

        const newTodo = {
            id: response.id,
            name: taskName,
            status: response.status,
            editing: false,
        };

        if (newTodo.name.trim().length >= 100) {
            Swal.fire("Descreva o que fazer com no máximo 100 caracteres!!");
            return;
        }

        if (newTodo.name.trim() !== "") {
            setTasks((prevTasks) => [...prevTasks, newTodo]);
        }
    }

    function toggleStatus(id) {
        //Utilizar Optimistic Update para mais rapidez para o user

        const taskSelected = tasks.find((task) => task.id === id);

        if (!taskSelected) return;

        const statusUpdated =
            taskSelected.status === "PENDENT" ? "DONE" : "PENDENT";

        taskService
            .updateTaskStatus(taskSelected.id, statusUpdated)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id == taskSelected.id
                            ? { ...task, status: statusUpdated }
                            : task
                    )
                );
            })
            .catch((error) => console.error(error));
    }

    function deleteTask(id, task) {
        if (task.status === "PENDENT") {
            Swal.fire({
                title: "Tem certeza que quer apagar?",
                text: "Você ainda não concluio essa tarefa!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sim",
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        taskService
                            .deleteTask(task.id)
                            .then(() => {
                                setTasks((prevTasks) =>
                                    prevTasks.filter((task) => task.id !== id)
                                );
                            })
                            .catch((error) => console.error(error));
                    }
                })
                .catch((error) => console.error(error));

            return;
        }
        taskService
            .deleteTask(task.id)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task.id !== id)
                );
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Header />
            </header>
            <main className="w-screen h-screen overflow-x-hidden flex flex-1 justify-center items-center  bg-blue-200">
                <div
                    className="xl:min-h-1/4 xl:max-h-3/4 xl:w-xl w-[90%] flex flex-col items-center justify-center bg-gray-600
  gap-4 rounded shadow-xl"
                >
                    <h1 className="text-amber-50 font-bold mt-5">TO-DO</h1>
                    <form
                        onSubmit={handleTask}
                        className="flex justify-center items-center gap-2"
                    >
                        <input
                            className="border-none outline-none rounded bg-amber-50 w-[55%] pl-1 text-black"
                            type="text"
                            name="newTask"
                            placeholder="Digite seu nome"
                        />
                        <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-amber-50 rounded font-bold px-7 py-0.5">
                            Adicionar
                        </button>
                    </form>
                    <ul className="flex overflow-auto flex-col items-stretch gap-1 max-h-90  mb-2">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex justify-center items-center h-20 min-h-15 xl:w-120 w-[70%]rounded bg-amber-50 shadow-md shadow-gray-600 m-1"
                            >
                                <div className="flex items-center justify-evenly w-full">
                                    {task.editing ? (
                                        <>
                                            {" "}
                                            <input
                                                name="input"
                                                value={task.name} //Corrigir erro de quando do balão não crescer de acordo com o tamanho do texto e verificar se o input não tá vazio antes de atualizar a edição
                                                onChange={(e) =>
                                                    handleTextEdit(
                                                        task.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="text-gray-950 left-1 w-96 max-h-14 pl-1 outline rounded"
                                            />
                                            <button
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    handleEditing(task.id);
                                                    editOk(task.id, task.name);
                                                }}
                                            >
                                                <img src={Ok} alt="" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleEditing(task.id)
                                                }
                                                className=""
                                            >
                                                <img
                                                    src={EditIcon}
                                                    className="ml-1 w-[30px] cursor-pointer"
                                                    alt=""
                                                />
                                            </button>
                                            <div className="flex-1 mx-2 my-1 min-w-0 max-h-14 overflow-y-auto bg-gray-200 border border-gray-600 rounded-md">
                                                <h2
                                                    className={`text-black font-bold left-1 break-words whitespace-normal pl-1 ${
                                                        task.status === "DONE"
                                                            ? "line-through italic"
                                                            : ""
                                                    }`}
                                                >
                                                    {task.name}
                                                </h2>
                                            </div>

                                            <input
                                                onChange={() =>
                                                    toggleStatus(task.id)
                                                }
                                                defaultChecked={
                                                    task.status === "DONE"
                                                }
                                                type="checkbox"
                                                className="checkbox checkbox-xl mt-1 checkbox-success "
                                            />

                                            <button
                                                onClick={() =>
                                                    deleteTask(task.id, task)
                                                }
                                                className="py-0.5 mx-1  w-[35px] cursor-pointer"
                                            >
                                                <img
                                                    className="w-8"
                                                    src={Trash}
                                                    alt=""
                                                />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default TodoList;
