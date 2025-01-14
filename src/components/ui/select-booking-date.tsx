"use client";
import * as React from "react";
import { Control, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilityData {
  date: Date | undefined;
  timeSlots: TimeSlot[];
}

interface DateAndTimeSelectorProps {
  name: string;
  control: Control;
}

const TIME_SLOTS: TimeSlot[] = [
  { start: "6:00 AM", end: "8:00 AM" },
  { start: "8:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "12:00 PM" },
  { start: "12:00 PM", end: "2:00 PM" },
  { start: "2:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "6:00 PM" },
  { start: "6:00 PM", end: "8:00 PM" },
  { start: "8:00 PM", end: "10:00 PM" },
  { start: "10:00 PM", end: "12:00 AM" },
  { start: "12:00 AM", end: "2:00 AM" },
];

export default function DateAndTimeSelector({
  name,
  control,
}: DateAndTimeSelectorProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ date: undefined, timeSlots: [] }}
      render={({ field }) => {
        const { value, onChange } = field;

        const handleDateSelect = (date: Date | undefined) => {
          onChange({ ...value, date });
        };

        const handleTimeSlotToggle = (timeSlot: TimeSlot) => {
          const isSelected = value.timeSlots.some(
            (slot: TimeSlot) =>
              slot.start === timeSlot.start && slot.end === timeSlot.end
          );

          const updatedTimeSlots = isSelected
            ? value.timeSlots.filter(
                (slot: TimeSlot) =>
                  slot.start !== timeSlot.start || slot.end !== timeSlot.end
              )
            : [...value.timeSlots, timeSlot];

          onChange({ ...value, timeSlots: updatedTimeSlots });
        };

        const isTimeSlotSelected = (timeSlot: TimeSlot) =>
          value.timeSlots.some(
            (slot: TimeSlot) =>
              slot.start === timeSlot.start && slot.end === timeSlot.end
          );

        return (
          <div className="space-y-6">
            {/* Date Selection */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal py-6"
                  aria-label="Pick a date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value.date ? format(value.date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar
                  mode="single"
                  selected={value.date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {TIME_SLOTS.map((timeSlot) => (
                <Card
                  key={`${timeSlot.start}-${timeSlot.end}`}
                  className={cn(
                    "p-3 cursor-pointer transition-colors",
                    isTimeSlotSelected(timeSlot)
                      ? "bg-primary-orange text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleTimeSlotToggle(timeSlot)}
                >
                  <p className="text-center">
                    {timeSlot.start} - {timeSlot.end}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}
