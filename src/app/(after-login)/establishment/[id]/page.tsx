"use client";

import { Button } from "@/components/ui/button";
import ProfessionalCard from "@/src/components/professional-card/professional-card";
import ServiceCard from "@/src/components/service-card/service-card";
import SliderOptions, { SliderOption } from "@/src/components/slider-option/slider-option";
import { useUser } from "@/src/context/user-context";
import { FunctionRole } from "@/src/enum/function-role.enum";
import { EstablishmentService } from "@/src/services/establishment.service";
import { EstablishmentResponse } from "@/src/types/establishment/establishment-response.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { UserRole } from "@/src/enum/user-role.enum";
import ProfessionalModal from "@/src/components/professional-modal/professional-modal";
import ServiceModal from "@/src/components/service-modal/service-modal";
import { ServiceResponse } from "@/src/types/service/service-response.type";

export default function EstablishmentPage() {
  const params = useParams<{ id: string }>();

  const [establishment, setEstablishment] = useState<EstablishmentResponse | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | number>("services");
  const [functionRole, setFunctionRole] = useState<FunctionRole | null>(null);
  const { user } = useUser();

  const [serviceModal, setServiceModal] = useState<boolean>(false);
  const [serviceOnModal, setServiceOnModal] = useState<ServiceResponse | null>(null);

  const handleOpenServiceModal = (service?: ServiceResponse) => {
    setServiceModal(true);
    setServiceOnModal(service || null);
  };

  const handleCloseServiceModal = () => {
    refreshData();
    setServiceModal(false);
    setServiceOnModal(null);
  };

  const [professionalModal, setProfessionalModal] = useState<boolean>(false);

  const options: SliderOption[] = [
    {
      id: "services",
      label: "Serviços",
    },
    {
      id: "professionals",
      label: "Profissionais",
    },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case "services":
        return (
          <div>
            {(functionRole === FunctionRole.OWNER || user?.role === UserRole.ADMIN) && (
              <div className="mb-4 flex justify-start">
                <Button className="cursor-pointer gap-2" onClick={() => handleOpenServiceModal()}>
                  <Plus className="h-4 w-4" />
                  Novo Serviço
                </Button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              {establishment?.services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        );
      case "professionals":
        return (
          <div>
            {(functionRole === FunctionRole.OWNER || user?.role === UserRole.ADMIN) && (
              <div className="mb-4 flex justify-start">
                <Button className="cursor-pointer gap-2" onClick={() => setProfessionalModal(true)}>
                  <Plus className="h-4 w-4" />
                  Novo Funcionário
                </Button>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              {establishment?.usersRelated.map((user) => (
                <ProfessionalCard key={user.userId} userEstablishment={user} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchEstablishment = async () => {
      const data = await EstablishmentService.getEstablishmentById(Number(params.id));
      setEstablishment(data);
      setFunctionRole(data.usersRelated.find((ur) => ur.userId === user?.id)?.role || null);
    };

    fetchEstablishment();
  }, [params.id, user?.id]);

  const refreshData = () => {
    const fetchEstablishment = async () => {
      const data = await EstablishmentService.getEstablishmentById(Number(params.id));
      setEstablishment(data);
    };

    fetchEstablishment();
  };

  if (!establishment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="mb-4 text-3xl font-bold">{establishment.name}</h1>
          <p className="text-muted-foreground mb-2">{establishment.description}</p>
          <p className="text-muted-foreground mb-2">{establishment.cnpj}</p>
          <p className="text-muted-foreground mb-2">
            {establishment.address.street}, {establishment.address.city}
          </p>
          <p className="text-muted-foreground mb-2">Sua role: {functionRole}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={"/default-establishment-photo.png"}
            alt="Main photo"
            width={500}
            height={300}
            className="h-auto w-full rounded-lg"
          />
          <div className="grid grid-cols-3 gap-2">
            <Image
              src={"/default-establishment-photo.png"}
              alt="Photo 1"
              width={166}
              height={100}
              className="h-auto w-full rounded-lg"
            />
            <Image
              src={"/default-establishment-photo.png"}
              alt="Photo 2"
              width={166}
              height={100}
              className="h-auto w-full rounded-lg"
            />
            <Image
              src={"/default-establishment-photo.png"}
              alt="Photo 3"
              width={166}
              height={100}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <SliderOptions
          options={options}
          defaultActive={selectedOption}
          onOptionChange={setSelectedOption}
        />
        <div className="mt-4">{renderContent()}</div>
      </div>

      {serviceModal && (
        <ServiceModal
          onClose={handleCloseServiceModal}
          service={serviceOnModal}
          establishmentId={establishment.id}
        />
      )}

      {professionalModal && (
        <ProfessionalModal
          onClose={() => setProfessionalModal(false)}
          establishmentId={establishment.id}
        />
      )}
    </div>
  );
}
