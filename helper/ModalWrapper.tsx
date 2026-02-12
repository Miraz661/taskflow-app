export default function ModalWrapper({ children,onClose }: { children: React.ReactNode, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#0004] backdrop-blur-xs text-white" onClick={onClose}>
            {children}
        </div>
    );
}