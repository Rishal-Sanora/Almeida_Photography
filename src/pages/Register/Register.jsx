import RegisterForm from "../../components/Forms/RegisterForm";

function Register() {
  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-center">

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">

        <h1 className="text-5xl text-blue-900 font-bold text-center mb-10">
          Register
        </h1>

        <RegisterForm />

      </div>

    </section>
  );
}

export default Register;