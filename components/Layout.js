import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="px-4 py-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
