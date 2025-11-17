"use client";

import { ServiceResponse } from "@/src/types/service/service-response.type";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ServiceRequest } from "@/src/types/service/service-request.type";
import { ServicePUTRequest } from "@/src/types/service/service-put-request.type";
import { ServiceService } from "@/src/services/service.service";

const serviceFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  durationMinutes: z.number().min(1, "Duração deve ser maior que 0"),
  price: z.number().min(0, "Preço deve ser maior ou igual a 0"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface ServiceModalProps {
  onClose: () => void;
  service: ServiceResponse | null;
  establishmentId: number;
}

export default function ServiceModal({ onClose, service, establishmentId }: ServiceModalProps) {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      durationMinutes: 0,
      price: 0,
    },
  });

  useEffect(() => {
    if (service) {
      form.reset({
        name: service.name,
        description: service.description,
        durationMinutes: service.durationMinutes,
        price: service.price,
      });
    }
  }, [service, form]);

  const onSubmit = async (data: ServiceFormValues) => {
    const payload: ServiceRequest = {
      ...data,
      establishmentId,
    };

    if (service) {
      await ServiceService.updateService(establishmentId, payload);
    } else {
      await ServiceService.createService(payload);
    }
    onClose();
  };

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
          className="absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mt-2">
          <h2 className="text-2xl font-bold">{service ? "Editar Serviço" : "Novo Serviço"}</h2>
          <p className="text-muted-foreground mt-2">
            {service
              ? "Edite as informações do serviço."
              : "Adicione um novo serviço ao estabelecimento."}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Corte de cabelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o serviço" className="min-h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="durationMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração (minutos)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="60"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="50.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button className="cursor-pointer" type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button className="cursor-pointer" type="submit">
                {service ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
