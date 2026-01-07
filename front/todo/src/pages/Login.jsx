import LoginForm from "../components/Login/components/LoginForm/LoginForm";
import TitleForm from "../components/Forms/TitleForm";
import CardForm from "../components/Forms/CardForm";

const Login = () => {
    return (
        <CardForm>
            <TitleForm title="Login" />
            <LoginForm />
        </CardForm>
    );
};

export default Login;
