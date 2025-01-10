export default function Button({ content, className }) {
  return (
    <div>
      <button
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
