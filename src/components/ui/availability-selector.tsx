"use client";
import * as React from "react";
import { Control, useController, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilityData {
  day: string;
  timeSlots: TimeSlot[];
}

interface AvailabilitySelectorProps {
  control?: Control<any>;
  name?: string;
  defaultValue?: AvailabilityData;
  onChange?: (value: AvailabilityData) => void;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIME_SLOTS: TimeSlot[] = [
  { start: "6:00 AM", end: "4:00 AM" },
  { start: "8:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "12:00 PM" },
  { start: "12:00 PM", end: "2:00 PM" },
  { start: "2:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "6:00 PM" },
  { start: "6:00 PM", end: "8:00 PM" },
  { start: "8:00 PM", end: "10:00 PM" },
  { start: "10:00 PM", end: "12:00 AM" },
];

export default function AvailabilitySelector({
  control,
  name = "availability",
  defaultValue = { day: "Sunday", timeSlots: [] },
  onChange,
}: AvailabilitySelectorProps) {
  const [selectedDay, setSelectedDay] = React.useState(defaultValue.day);
  const [selectedTimeSlots, setSelectedTimeSlots] = React.useState<TimeSlot[]>(
    defaultValue.timeSlots
  );

  const { control: formControl } = useForm();
  const actualControl = control || formControl;

  const { field } = useController({
    name,
    control: actualControl,
    defaultValue,
  });

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
    updateValue({ day, timeSlots: selectedTimeSlots });
  };

  const handleTimeSlotToggle = (timeSlot: TimeSlot) => {
    const isSelected = selectedTimeSlots.some(
      (slot) => slot.start === timeSlot.start && slot.end === timeSlot.end
    );

    const updatedTimeSlots = isSelected
      ? selectedTimeSlots.filter(
          (slot) => slot.start !== timeSlot.start || slot.end !== timeSlot.end
        )
      : [...selectedTimeSlots, timeSlot];

    setSelectedTimeSlots(updatedTimeSlots);
    updateValue({ day: selectedDay, timeSlots: updatedTimeSlots });
  };

  const updateValue = (value: AvailabilityData) => {
    field.onChange(value);
    onChange?.(value);
  };

  const isTimeSlotSelected = (timeSlot: TimeSlot) =>
    selectedTimeSlots.some(
      (slot) => slot.start === timeSlot.start && slot.end === timeSlot.end
    );

  return (
    <div className="space-y-4 rounded-md">
      {/* Days Selection */}
      <div className="flex flex-wrap bg-primary-light-gray ">
        {DAYS.map((day) => (
          <div
            key={day}
            className={cn(
              "flex-1  p-4 flex flex-center justify-center items-center mx-auto",
              selectedDay === day &&
                "bg-primary-orange text-primary-foreground rounded"
            )}
            onClick={() => handleDaySelect(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-3">
        {TIME_SLOTS.map((timeSlot) => (
          <Card
            key={`${timeSlot.start}-${timeSlot.end}`}
            className={cn(
              "p-4 cursor-pointer transition-colors",
              isTimeSlotSelected(timeSlot)
                ? "bg-primary-orange text-primary-foreground"
                : "hover:bg-muted"
            )}
            onClick={() => handleTimeSlotToggle(timeSlot)}
          >
            <p className="text-center">
              {timeSlot.start}-{timeSlot.end}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
