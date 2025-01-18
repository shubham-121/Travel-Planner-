import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignIn() {
  return (
    <div className=" bg-custom-gradient h-screen w-full flex items-center justify-center flex-col">
      <SignInForm />
    </div>
  );
}

function SignInForm() {
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

  // function handleNameChange(e) {
  //   setFormData((prevData) => ({ ...prevData, name: e.target.value }));
  // }

  //register user data to backend
  async function handleSubmit(e) {
    //form validation first
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data);
        alert("Successfully registered the user.");

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
        alert(data.message || "Error in registering the user.");
      }
    } catch (err) {
      console.error("Error in registering the user", err);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="p-4 border rounded w-80 mx-auto mt-5 border-custom">
      <p className="text-center font-semibold text-xl mt-5 text-blue-900">
        Register today, to use our website!
      </p>
      <form method="POST">
        <label className="block mb-2">User Name:</label>
        <input
          value={formData.name}
          name="name"
          // onChange={handleFormChange}
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
        <label className="block mb-2">User Email:</label>
        <input
          value={formData.email}
          name="email"
          onChange={handleFormChange}
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
