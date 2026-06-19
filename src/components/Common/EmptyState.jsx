function EmptyState({
  message
}) {
  return (
    <div className="text-center py-20">

      <h2 className="text-3xl text-gray-500">
        {message}
      </h2>

    </div>
  );
}

export default EmptyState;