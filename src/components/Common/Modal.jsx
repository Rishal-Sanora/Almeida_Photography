function Modal({
  children,
  open,
  setOpen
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

      <div className="bg-[#111] p-10 rounded-3xl relative">

        <button
          className="absolute top-3 right-4 text-3xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        {children}

      </div>

    </div>
  );
}

export default Modal;