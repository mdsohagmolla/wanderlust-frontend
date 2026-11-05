"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, CircleAlert, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

import {  useRouter } from "next/navigation";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "wildlife", label: "Wildlife" },
  { value: "luxury", label: "Luxury" },
];

const STORAGE_KEY = "wanderlust:travel-packages";

type FormState = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) errors.name = "Destination name is required";
  if (!form.country.trim()) errors.country = "Country is required";
  if (!form.category) errors.category = "Please select a category";

  if (!form.price.trim()) {
    errors.price = "Price is required";
  } else if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = "Enter a valid price";
  }

  if (!form.duration.trim()) errors.duration = "Duration is required";
  if (!form.departureDate) errors.departureDate = "Departure date is required";

  if (!form.imageUrl.trim()) {
    errors.imageUrl = "Image URL is required";
  } else if (!/^https?:\/\/\S+$/i.test(form.imageUrl.trim())) {
    errors.imageUrl = "Enter a valid URL";
  }

  if (!form.description.trim()) errors.description = "Description is required";

  return errors;
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AddDestinationPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setStatus(null);
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Todo: use token for secure backend:
    const token = await getTokenFromClient();
    
    

    // Todo: send data to backend 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
        method: "POST",
        headers:{
            'Content-Type':'Application/json',
            authorization: `Bearer ${token}`
        },
         body: JSON.stringify(form)
    })

    //for Confirm data added 

     const afterSubmit = await res.json();
     
     toast.success("Destination updated successfully!");
     router.push('/destinations')

     console.log('after submit', afterSubmit)


    

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus(null);
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      ...form,
      name: form.name.trim(),
      country: form.country.trim(),
      price: Number(form.price),
      imageUrl: form.imageUrl.trim(),
      description: form.description.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...(Array.isArray(stored) ? stored : []), entry])
      );
    } catch {
      // Storage may be unavailable (private mode); the form still resets.
    }

    setForm(emptyForm);
    setStatus("Travel package added successfully.");
  };
// console.log('form', form)
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-10 w-full max-w-3xl border-border bg-card py-6 shadow-sm md:py-8">
        <CardContent className="px-5 md:px-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {status ? (
              <p
                role="status"
                className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-3 py-2.5 text-sm text-foreground"
              >
                <CheckCircle2
                  className="size-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                {status}
              </p>
            ) : null}

            <Field label="Destination Name" htmlFor="name" error={errors.name}>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                className="h-10"
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Country" htmlFor="country" error={errors.country}>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="off"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={(event) => updateField("country", event.target.value)}
                  aria-invalid={Boolean(errors.country)}
                  className="h-10"
                />
              </Field>

              <Field label="Category" htmlFor="category" error={errors.category}>
                <Select
                  value={form.category || null}
                  items={CATEGORIES}
                  onValueChange={(value) => updateField("category", value ?? "")}
                >
                  <SelectTrigger
                    id="category"
                    aria-invalid={Boolean(errors.category)}
                    className="h-10 w-full"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Price (USD)" htmlFor="price" error={errors.price}>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min={1}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  aria-invalid={Boolean(errors.price)}
                  className="h-10"
                />
              </Field>

              <Field label="Duration" htmlFor="duration" error={errors.duration}>
                <Input
                  id="duration"
                  name="duration"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) => updateField("duration", event.target.value)}
                  aria-invalid={Boolean(errors.duration)}
                  className="h-10"
                />
              </Field>
            </div>

            <Field
              label="Departure Date"
              htmlFor="departureDate"
              error={errors.departureDate}
            >
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  updateField("departureDate", event.target.value)
                }
                aria-invalid={Boolean(errors.departureDate)}
                className="h-10"
              />
            </Field>

            <Field label="Image URL" htmlFor="imageUrl" error={errors.imageUrl}>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                inputMode="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => updateField("imageUrl", event.target.value)}
                aria-invalid={Boolean(errors.imageUrl)}
                className="h-10"
              />
            </Field>

            <Field
              label="Description"
              htmlFor="description"
              error={errors.description}
            >
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                aria-invalid={Boolean(errors.description)}
                className="min-h-28 resize-y"
              />
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="h-10 border-destructive/40 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/50"
              >
                <Trash2 aria-hidden="true" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-brand px-4 text-brand-foreground hover:bg-brand/90"
              >
                <Save aria-hidden="true" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
