import { ServiceResponse } from "@/src/types/service/service-response.type";
import { UserEstablishmentResponseDTO } from "@/src/types/user-establishment/user-establishment-response.type";

interface ServiceCardProps {
  service: ServiceResponse;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  console.log(`Recebido: ${service}`);
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{service.name}</h2>
      <p className="text-muted-foreground">{service.description}</p>
      <p className="text-muted-foreground font-bold">R$ {service.price.toFixed(2)}</p>
      <p className="text-muted-foreground">{service.durationMinutes} minutos</p>
    </div>
  );
}
