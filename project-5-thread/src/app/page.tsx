import Footer from "@/components/shared/landing/Footer";
import Hero from "@/components/shared/landing/Hero";
import Navbar from "@/components/shared/landing/Navbar";
import React from "react";

export default function Home() {
  return (
    <section className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />

      <Hero />


      <Footer />
    </section>
  );
}
