//Modal for favs, wishlist, visited

export default function Modal() {
  return (
    <div>
      <RenderModal></RenderModal>
    </div>
  );
}

function RenderModal() {
  return (
    <div className="border-custom flex items-center justify-center min-h[1/2] min-w-[1/2]  z-50">
      This is the modal
    </div>
  );
}
