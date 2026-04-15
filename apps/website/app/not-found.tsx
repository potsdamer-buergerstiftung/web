import WebsiteLayout from "./(website)/layout";

export default function NotFound() {
  return (
    <WebsiteLayout>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Seite nicht gefunden</h1>
      </div>
    </WebsiteLayout>
  );
}
