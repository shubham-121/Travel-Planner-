export default function UserNotFound({ message }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-center px-2 py-2 mt-4">
        Oops! Looks like the user data does'nt exsist in the Db.{" "}
      </p>
      <p className="text-2xl font-semibold text-center px-2 py-2 mt-4">
        {message}
      </p>
    </div>
  );
}
