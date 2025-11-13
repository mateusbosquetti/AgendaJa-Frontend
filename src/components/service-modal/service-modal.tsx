import { X } from "lucide-react";

interface ServiceModalProps {
  onClose: () => void;
}

export default function ServiceModal({ onClose }: ServiceModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background relative w-full max-w-2xl rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mt-2">
          <h2 className="text-2xl font-bold">Novo Serviço</h2>
          <p className="text-muted-foreground mt-2">Adicione um novo serviço ao estabelecimento.</p>
        </div>
      </div>
    </div>
  );
}
