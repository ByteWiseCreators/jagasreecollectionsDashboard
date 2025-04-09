import { Input, InputPasword } from "../components/input-underline";
import Button from "../components/Button";
import welcomeImg from "../assets/welcome.svg";
import { BeatLoader } from "react-spinners";

import { useContext, useEffect, useState } from "react";
import { delay } from "../Utils";

import { FaRegUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";

const Login = () => {
  const EMAIL = "jagasreecollections@gmail.com";
  const PASSWORD = "kesowsree2407";

  const { setUserLoged, userLoged } = useContext(DashboardContext);
  const navigate = useNavigate();
  const [loding, setLoding] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setValues((pv) => ({ ...pv, [e.target.name]: e.target.value }));

  const login = async (e) => {
    e.preventDefault();
    setLoding(true);
    if (values.email && values.password) {
      if (values.email === EMAIL && values.password === PASSWORD) {
        setUserLoged(true);
        const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
        document.cookie = `current_theam=true; expires=${expires}; path=/`;
        console.log(document.cookie);
        await delay(1500);
        navigate("/", { replace: true });
        setLoding(false);
      } else {
        setError("Invalid Email or Password");
        setLoding(false);
      }
    } else {
      setError("Please fill all the fields");
      setLoding(false);
    }
    setTimeout(() => {
      setError("");
    }, 2500);
  };

  useEffect(() => {
    if (userLoged) navigate("/");
  }, [navigate, userLoged]);

  return (
    <section className="overflow-x-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-center w-full h-screen">
          <div className="relative flex flex-col px-5 pt-5 pb-10 border border-gray-200 rounded-lg shadow-md login bg-white/55 md:w-1/3 gap-y-5">
            <div className="flex flex-col items-center">
              <img
                className="object-contain size-40"
                src={welcomeImg}
                alt="Welcome"
              />
              <h2 className="text-xl font-medium font-heading text-text">
                Login as Admin
              </h2>
              <h6 className="text-sm font-medium font-body text-neutral-500">
                Enter authorised Email and password to continue
              </h6>
              {error && (
                <p className="mt-2 text-base font-semibold text-red-500 font-body">
                  {error}
                </p>
              )}
            </div>
            <form className="w-full px-5 space-y-3">
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                icon={<FaRegUser className="text-gray-600" />}
                type="text"
                placeholder="Enter email"
              />
              <InputPasword
                name="password"
                value={values.password}
                onChange={handleChange}
                icon={<IoKeyOutline className="text-gray-800" />}
                placeholder="Enter password"
              />
              <Button type="submit" onClick={login} className="theam-grad-1">
                {loding ? (
                  <BeatLoader color="#fff" />
                ) : (
                  <span className="font-heading">Login</span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
