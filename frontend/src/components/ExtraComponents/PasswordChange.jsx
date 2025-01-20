import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

export default function PasswordChange() {
  return (
    <div className=" bg-custom-gradient h-screen w-full flex items-center justify-center flex-col">
      <PassWordChangeForm />
    </div>
  );
}

//password change:-
// 1- verify user  2- update old password with new password
function PassWordChangeForm() {
  const [userVerified, setUserVerified] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    //state for holding form data
    name: "",
    password: "",
    email: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  //check whetther user exsist in Db with the email id
  async function validateUserEmail() {
    try {
      if (!formData.email) {
        alert("Please enter the email first");
        return;
      }

      const res = await fetch("http://localhost:5000/passwordChange", {
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
        alert("Successfully verified  the user.");

        setIsVerified((prev) => !prev);

        //reset form fields
        // setFormData({
        //   name: "",
        //   email: "",
        //   password: "",
        // });
      } else {
        console.error("Error:", data.message || "Unknown error");
        alert(data.message || "Error in verifying the user.");
      }
    } catch (err) {
      console.error("Error verifying the user", err);
      alert("An unexpected error occurred while  verifying. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!formData.password) {
        alert("Enter the new password");
        return;
      }

      const res = await fetch("http://localhost:5000/passwordChange", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (res.status === 200) {
        console.log(data);
        alert("User Password change successfull.");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/login");

        // setIsVerified((prev) => !prev);
      } else {
        console.error("Error:", data.message || "Unknown error");
        alert(data.message || "Error in updating the user password.");
      }
    } catch (err) {
      console.error("Error in updating the user password.", err);
      alert(
        "An unexpected error occurred while  updating the user password. Please try again."
      );
    }
  }

  return (
    <div className="p-4 border rounded w-80 mx-auto mt-5 border-custom">
      <p className="text-center font-semibold text-xl mt-5 text-blue-900 mb-4">
        Welcome Back, Login fast to use the website!
      </p>
      <form method="POST">
        <label className="block mb-2">Enter Exsisting User Email:</label>
        <div className="flex flex-row items-center justify-center space-x-1">
          <input
            value={formData.email}
            name="email"
            onChange={handleFormChange}
            type="text"
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            className={
              isVerified
                ? "text-red-600 hover:scale-110"
                : "hover:text-blue-900 hover:scale-110"
            }
            onClick={validateUserEmail}
          >
            {isVerified ? "Verified" : "Verify"}
          </button>
        </div>

        <label className="block mb-2">Enter New User Password:</label>
        <input
          value={isVerified ? formData.password : ""}
          name="password"
          onChange={handleFormChange}
          type="text"
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <Link
          onClick={() => navigate("/login")}
          className="hover:text-blue-900  hover:scale-110"
        >
          Go back?
        </Link>

        <button
          // disabled={!userVerified}
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
