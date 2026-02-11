import Sidebar from "./Sidebar";


export default function MainLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">
            <Sidebar />
            {children}
        </div>
    );
}