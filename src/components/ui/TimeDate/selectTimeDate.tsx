"use client";

import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { format, isBefore } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimeSelectorProps {
  name: string;
  control: Control<any>;
  errors: any; // To display error messages
}

export function DateTimeSelector({
  name,
  control,
  errors,
}: DateTimeSelectorProps) {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");

  // Generate filtered end time options based on selected start time
  const filteredEndTimeOptions = generateTimeOptions().filter(
    (time) => !startTime || isTimeAfter(time, startTime)
  );

  return (
    <div className="space-y-4">
      {/* Date Field */}
      <Controller
        name={`${name}.date`}
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field }) => (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setDate(date);
                  }}
                  disabled={(date) =>
                    isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors?.[name]?.date && (
              <p className="text-red-600 text-sm">
                {errors[name]?.date?.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Start Time and End Time */}
      <div className="flex space-x-4">
        {/* Start Time */}
        <Controller
          name={`${name}.startTime`}
          control={control}
          rules={{ required: "Start time is required" }}
          render={({ field }) => (
            <div className="w-full">
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setStartTime(value);
                }}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Start Time" />
                </SelectTrigger>
                <SelectContent>
                  {generateTimeOptions().map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.[name]?.startTime && (
                <p className="text-red-600 text-sm">
                  {errors[name]?.startTime?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* End Time */}
        <Controller
          name={`${name}.endTime`}
          control={control}
          rules={{ required: "End time is required" }}
          render={({ field }) => (
            <div className="w-full">
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!startTime} // Disable if startTime is not selected
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="End Time" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEndTimeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.[name]?.endTime && (
                <p className="text-red-600 text-sm">
                  {errors[name]?.endTime?.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

// Helper: Generate time options in AM/PM format
function generateTimeOptions() {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hour12 = hour % 12 === 0 ? 12 : hour % 12; // Convert to 12-hour format
      const period = hour < 12 ? "AM" : "PM"; // Determine AM/PM
      const time = `${hour12.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
      options.push(time);
    }
  }
  return options;
}

// Helper: Check if one time is after another
function isTimeAfter(time1: string, time2: string) {
  const convertTo24Hour = (time: string) => {
    const [hoursMinutes, period] = time.split(" ");
    const [hours, minutes] = hoursMinutes.split(":").map(Number);

    const hours24 =
      period === "PM" && hours !== 12
        ? hours + 12
        : period === "AM" && hours === 12
        ? 0
        : hours;
    return hours24 * 60 + minutes; // Return total minutes
  };

  return convertTo24Hour(time1) > convertTo24Hour(time2);
}
