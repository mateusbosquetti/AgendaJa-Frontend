"use client";

import { useUser } from "@/src/context/user-context";
import { EstablishmentRequest } from "@/src/types/establishment/establishment-request.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { EstablishmentService } from "@/src/services/establishment.service";

interface EstablishmentFormProps {
  id?: number;
}

export default function EstablishmentForm({ id }: EstablishmentFormProps) {
  const { user } = useUser();
  const [establishment, setEstablishment] = useState<EstablishmentRequest | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch establishment data by ID and set it to state
    } else {
      setEstablishment({
        name: "",
        cnpj: "",
        ownerId: user?.id || 0,
        address: {
          city: "",
          countryCode: "",
          latitude: 0,
          longitude: 0,
          number: 0,
          postalCode: "",
          stateProvince: "",
          street: "",
        },
      });
    }
  }, [user]);

  const addressSchema = z.object({
    city: z.string().min(2).max(100),
    countryCode: z.string().min(2).max(10),
    latitude: z.number(),
    longitude: z.number(),
    number: z.number(),
    postalCode: z.string().min(2).max(20),
    stateProvince: z.string().min(2).max(100),
    street: z.string().min(2).max(100),
  });

  const establishmentSchema = z.object({
    name: z.string().min(2).max(50),
    // cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Invalid CNPJ format"),
    cnpj: z.string(),
    address: addressSchema,
  });

  const form = useForm<z.infer<typeof establishmentSchema>>({
    resolver: zodResolver(establishmentSchema),
    defaultValues: {
      name: "",
      cnpj: "82012810000122",
      address: {
        city: "Jaraguá do Sul",
        countryCode: "BR",
        latitude: 0,
        longitude: 0,
        number: 21,
        postalCode: "89255-445",
        stateProvince: "SC",
        street: "Lauro Donat",
      },
    },
  });

  function onSubmit(data: z.infer<typeof establishmentSchema>) {
    setIsSubmitting(true);
    try {
      // Submit form data to API
      const payload: EstablishmentRequest = { ...data, ownerId: user?.id || 0 };
      EstablishmentService.createEstablishment(payload).then((response) => {
        console.log("Establishment created:", response);
      });
    } catch (error) {
      setSubmitError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!establishment) {
    return <div>Loading...</div>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Establishment Section */}
        <div className="space-y-4">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-lg font-semibold">Establishment Information</h2>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Establishment Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter establishment name"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="00.000.000/0000-00" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormDescription>Format: XX.XXX.XXX/XXXX-XX</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <div className="border-border border-b pb-3">
            <h2 className="text-foreground text-lg font-semibold">Address Information</h2>
          </div>

          <FormField
            control={form.control}
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code (CEP)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="00000-000"
                    {...field}
                    // onChange={(e) => handlePostalCodeChange(e.target.value)}
                    disabled={isSubmitting || isFetchingAddress}
                  />
                </FormControl>
                <FormDescription>
                  {isFetchingAddress ? "Fetching address..." : "Auto-fills address fields"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter street name"
                    {...field}
                    disabled={isSubmitting || isFetchingAddress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter street number"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      {...field}
                      disabled={isSubmitting || isFetchingAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.stateProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter state"
                      maxLength={2}
                      {...field}
                      disabled={isSubmitting || isFetchingAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address.countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Input placeholder="BR" maxLength={2} {...field} disabled={isSubmitting} />
                </FormControl>
                <FormDescription>2-letter ISO country code (e.g., BR, US)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      placeholder="0.000000"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isFetchingAddress}
            className="h-11 flex-1 rounded-md bg-blue-700 font-semibold text-white hover:bg-blue-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Establishment"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting || isFetchingAddress}
            className="flex-1"
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
