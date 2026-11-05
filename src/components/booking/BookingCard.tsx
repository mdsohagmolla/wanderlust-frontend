
'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { formatPrice } from "../destination-card";
import { IDestination } from "@/lib/type";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";



/** Shared selling points shown under the Book Now button. */
const BOOKING_PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: IDestination }) => {

  // User er data:
  const { data: session } = authClient.useSession()
  const user = session?.user

   



  // console.log('booking card er data ', destination)

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    

    const departureDate = (e.currentTarget.elements.namedItem("depurtureDate") as HTMLInputElement).value



    //  Todo:
    // একটি destination-এর _id দিয়ে একাধিক booking তৈরি করার চেষ্টা হচ্ছে। MongoDB-তে একই collection-এর দুটি document-এর _id একই হতে পারে না।
    // Frontend-এ ...destination থেকে _id বাদ দিয়ে বাকি data পাঠাও।

    const { _id, ...destinationData } = destination;

    const data = {
      userName: user?.name,
      email: user?.email,
      image: user?.image,
      ...destinationData,
       destinationId: _id,
      departureDate: departureDate,
      bookingDate: new Date()
    }

    // Booking API Call to send data server

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)


    })

    const result = await res.json();

    if (res.status===409) {
  toast.error("Destinaton already added");
  return;
}
if (!res.ok) {
  toast.error(result.message||'booking failed');
  return;
}
    // const bookingData = await res.json();
     toast.success("Booking successful!");

      
    
    
      // console.log("booking er data ", bookingData)




    // console.log('booking data', data)
  }
  const priceLabel = formatPrice(destination.price);
  return (
    <div>
      <aside className="self-start lg:sticky lg:top-6">
        <Card className="gap-4 py-5 shadow-sm ">
          <CardContent className="flex flex-col gap-4 px-5">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              {priceLabel ? (
                <p className="mt-1 text-4xl leading-none font-semibold text-brand">
                  {priceLabel}
                </p>
              ) : null}
              <p className="mt-1.5 text-sm text-muted-foreground">per person</p>
            </div>

            <div className="flex flex-col gap-3">
              <form onSubmit={handleBooking}>
                <Input
                  type="date"
                  name="depurtureDate"
                  defaultValue={destination.departureDate ?? ""}
                  aria-label="Departure date"
                  className="h-10 border-transparent bg-muted px-3"
                />
                <Button 
                  type="submit"
                  
                  className="h-10 w-full gap-2 bg-brand font-semibold text-brand-foreground hover:bg-brand/90"
                >
                  Book Now
                  <ArrowRight aria-hidden="true" />
                </Button>
              </form>
            </div>

            <ul className="flex flex-col gap-2">
              {BOOKING_PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-green-600" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default BookingCard;