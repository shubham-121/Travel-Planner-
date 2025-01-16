//custom button

export default function Button({ content, className, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={
          className
            ? `${className} border-custom min-h-8`
            : "border-custom min-h-8"
        }
      >
        {content}
      </button>
    </div>
  );
}
