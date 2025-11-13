"use client";

import ProfessionalCard from "@/src/components/professional-card/professional-card";
import ServiceCard from "@/src/components/service-card/service-card";
import SliderOptions, { SliderOption } from "@/src/components/slider-option/slider-option";
import { EstablishmentService } from "@/src/services/establishment.service";
import { EstablishmentResponse } from "@/src/types/establishment/establishment-response.type";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EstablishmentPage() {
  const params = useParams<{ id: string }>();

  const [establishment, setEstablishment] = useState<EstablishmentResponse | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | number>("services");

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
          <div className="grid grid-cols-1 gap-4">
            {establishment?.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        );
      case "professionals":
        return (
          <div className="grid grid-cols-1 gap-4">
            {establishment?.usersRelated.map((user) => (
              <ProfessionalCard key={user.userId} userEstablishment={user} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchEstablishment = async () => {
      EstablishmentService.getEstablishmentById(Number(params.id)).then((data) =>
        setEstablishment(data)
      );
    };

    fetchEstablishment();
  }, [params.id]);

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
    </div>
  );
}
