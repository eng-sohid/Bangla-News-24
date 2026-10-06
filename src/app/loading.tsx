const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-brand" />
      <p className="font-serif text-lg font-bold text-muted">
        খবর লোড হচ্ছে...
      </p>
    </div>
  );
};

export default Loading;
