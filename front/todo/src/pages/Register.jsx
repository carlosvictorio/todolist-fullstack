import TitleForm from "../components/Forms/TitleForm";
import CardForm from "../components/Forms/CardForm";
import RegisterForm from "../components/Register/components/RegisterForm/RegisterForm";

const Register = () => {
    return (
        <CardForm>
            <TitleForm title="Register" />
            <RegisterForm />
        </CardForm>
    );
};

export default Register;
