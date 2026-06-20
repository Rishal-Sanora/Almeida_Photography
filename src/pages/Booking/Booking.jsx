import BookingForm from "../../components/Forms/BookingForm";
import PageTransition from "../../components/PageTransition";
import { useSEO } from "../../hooks/useSEO";

function Booking() {
  useSEO({
    title: "Book a Session",
    description: "Book your professional photography session with Almeida Photography today. Secure your date for weddings, private events, or portraits."
  });

  return (
    <PageTransition>
      <section className="bg-transparent min-h-screen py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-4xl md:text-5xl text-white font-extrabold mb-16 tracking-[0.2em] uppercase drop-shadow-lg">
            Book <span className="text-[#D4AF37]">Session</span>
          </h1>
          <BookingForm />
        </div>
      </section>
    </PageTransition>
  );
}

export default Booking;