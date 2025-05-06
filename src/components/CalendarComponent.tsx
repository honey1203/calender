"use client";

import React, { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isBefore,
  isSameDay,
  startOfDay,
} from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(startOfDay(new Date())); // Use state for current date

  // Effect to update the date daily (or more frequently for testing/demonstration)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const today = startOfDay(new Date());
      // Only update state if the day has actually changed
      if (!isSameDay(today, currentDate)) {
        setCurrentDate(today);
      }
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentDate]); // Rerun effect if currentDate changes

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Create an array for the grid, including blank starting cells
  const startingDayIndex = getDay(firstDayOfMonth); // 0 = Sunday, 1 = Monday, ...
  const calendarDays = Array(startingDayIndex).fill(null).concat(daysInMonth);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-center font-medium text-muted-foreground mb-2">
          {weekdays.map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isPast = day && isBefore(day, currentDate);
            const isToday = day && isSameDay(day, currentDate);
            const isCellFilled = day !== null;

            return (
              <div
                key={index}
                className={cn(
                  "h-16 sm:h-20 flex items-center justify-center rounded-md text-sm sm:text-base border",
                  isCellFilled ? "bg-secondary" : "bg-transparent border-transparent", // White for filled days, transparent for empty
                  isToday && "border-2 border-accent ring-2 ring-accent ring-offset-2", // Red border/ring for today
                  isPast && "relative", // Needed for positioning the 'X'
                  !isCellFilled && "pointer-events-none" // Make empty cells non-interactive
                )}
              >
                {day && (
                  <span className={cn(
                    isToday ? "font-bold text-accent" : "",
                    isPast ? "text-muted-foreground" : "" // Gray out past date numbers
                  )}>
                    {format(day, 'd')}
                  </span>
                )}
                {isPast && (
                   <span className="absolute inset-0 flex items-center justify-center text-destructive text-3xl sm:text-4xl font-black pointer-events-none opacity-70">
                     X
                   </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarComponent;
