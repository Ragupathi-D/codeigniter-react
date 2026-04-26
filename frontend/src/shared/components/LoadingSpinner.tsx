export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="size-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
    </div>
  );
}
