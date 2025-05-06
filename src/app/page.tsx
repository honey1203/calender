import CalendarComponent from '@/components/CalendarComponent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 bg-background">
       <h1 className="text-4xl font-bold mb-8 text-center text-primary">ChronoCross Calendar</h1>
      <CalendarComponent />
    </main>
  );
}
