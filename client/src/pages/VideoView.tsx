export default function VideoView() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border bg-black">
          <iframe
            src="https://drive.google.com/file/d/1m9fG-5l3Y6X96u7GQqB1vaUClhqu6Rwi/preview"
            width="100%"
            height="100%"
            allow="autoplay"
            className="border-none"
          />
        </div>
      </main>
    </div>
  );
}
