import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

export default function SignIn() {
  return (
    <div className=" bg-custom-gradient h-screen w-full flex items-center justify-center flex-col">
      <LogInForm />
    </div>
  );
}

function LogInForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    //state for holding form data
    name: "",
    password: "",
    email: "",
  });

  function handleFormChange(e) {
    const { name, value } = e.target;
    // console.log(`Property name: ${name}: value : ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //form validation first
    if (!formData.email || !formData.password) {
      alert("All input fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200) {
        console.log(data);
        alert("Successfully logged in the user.");

        //reset form fields
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        //navigate to home route
        navigate("/");
      } else {
        console.error("Error:", data.message || "Unknown error");
        alert(data.message || "Error in logging the user.");
      }
    } catch (err) {
      console.error("Error in logging the user", err);
      alert("An unexpected error occurred while logging. Please try again.");
    }
  }

  return (
    <div className="p-4 border rounded w-80 mx-auto mt-5 border-custom">
      <p className="text-center font-semibold text-xl mt-5 text-blue-900 mb-4">
        Welcome Back, Login fast to use the website!
      </p>
      <form method="POST">
        <label className="block mb-2">User Email:</label>
        <input
          value={formData.email}
          name="email"
          onChange={handleFormChange}
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">User Password:</label>
        <input
          value={formData.password}
          name="password"
          onChange={handleFormChange}
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <Link onClick={() => navigate("/passwordChange")}>
          Forgot Password?
        </Link>

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

//  //register user data to backend
//   async function handleSubmit(e) {
//     //form validation first
//     if (!formData.name || !formData.email || !formData.password) {
//       // alert("All fields are required");
//       return;
//     }

//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         console.log(data);
//         alert("Successfully registered the user.");

//         //reset form fields
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//         });

//         //navigate to home route
//         navigate("/");
//       } else {
//         console.error("Error:", data.message || "Unknown error");
//         alert(data.message || "Error in registering the user.");
//       }
//     } catch (err) {
//       console.error("Error in registering the user", err);
//       alert("An unexpected error occurred. Please try again.");
//     }
//   }
