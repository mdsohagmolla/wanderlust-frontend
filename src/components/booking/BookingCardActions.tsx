"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getBookingId, type IBooking } from "./types";

const BOOKING_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/booking`;

/** Cancel (with confirmation) and View actions for a single booking card. */
function BookingCardActions({ booking }: { booking: IBooking }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const bookingId = getBookingId(booking);
  // Bookings are created by spreading the destination, so _id usually
  // doubles as the destination id the View button links to.
  const destinationId = booking.destinationId ?? bookingId;
  const viewHref = destinationId ? `/destinations/${destinationId}` : "/destinations";

  const handleCancel = async () => {
    if (!bookingId) return;
    setCancelling(true);
    try {
      const res = await fetch(`${BOOKING_API_URL}/${bookingId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Cancel failed with status ${res.status}`);
      toast.success("Booking cancelled");
      setOpen(false);
      // Re-runs the server page so the cancelled booking disappears.
      router.refresh();
    } catch (error) {
      console.error("Could not cancel booking:", error);
      toast.error("We could not cancel this booking. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={!bookingId}
          onClick={() => setOpen(true)}
          className="gap-1.5 border-destructive/40 px-3.5 text-destructive hover:bg-destructive/10 hover:text-destructive dark:border-destructive/50"
        >
          <Trash2 aria-hidden="true" />
          Cancel
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Your trip will be cancelled. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Keep booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-destructive font-semibold text-white hover:bg-destructive/90"
            >
              {cancelling ? "Cancelling..." : "Yes, cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Link href={viewHref}>
        <Button
          type="button"
          size="lg"
          className="gap-1.5 bg-brand px-4 font-semibold text-brand-foreground hover:bg-brand/90"
        >
          <Eye aria-hidden="true" />
          View
        </Button>
      </Link>
    </div>
  );
}

export { BookingCardActions };
