import { Hero } from "@/sections/home/Hero";
import { WhatItDoes } from "@/sections/home/WhatItDoes";
import { RingShowcase } from "@/sections/home/RingShowcase";
import { Companion } from "@/sections/home/Companion";
import { Ecosystem } from "@/sections/home/Ecosystem";
import { Family } from "@/sections/home/Family";
import { Story, WaitlistBand } from "@/sections/home/Story";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatItDoes />
      <RingShowcase />
      <Companion />
      <Ecosystem />
      <Family />
      <Story />
      <WaitlistBand />
    </>
  );
}
