import { CheckCircle2, Clock3, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "cn";
import { normalizeBookingStatus, type BookingStatus } from "./types";

const STATUS_STYLES: Record<
  BookingStatus,
  { label: string; className: string; Icon: LucideIcon }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    Icon: Clock3,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    Icon: XCircle,
  },
};

function BookingStatusBadge({
  status,
  className,
}: {
  status?: string;
  className?: string;
}) {
  const { label, className: statusClassName, Icon } =
    STATUS_STYLES[normalizeBookingStatus(status)];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        statusClassName,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export { BookingStatusBadge };
