import { SmokeyBackground, LoginForm } from "@/components/ui/login-form";
import { GradientButton } from "@/components/ui/gradient-button";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-4 p-6 items-center justify-center bg-slate-900 rounded-2xl">
      <GradientButton>Get Started</GradientButton>
      <GradientButton variant="variant">Get Started</GradientButton>
      <GradientButton variant="rose">SIGAP Shield</GradientButton>
      <GradientButton variant="amber">SIGAP Alert</GradientButton>
      <GradientButton variant="emerald">SIGAP Converge</GradientButton>
    </div>
  );
}

export default function DemoOne() {
  return (
    <main className="relative w-screen h-screen bg-gray-900 overflow-hidden">
      <SmokeyBackground className="absolute inset-0" color="#1D4ED8" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 gap-6">
        <LoginForm />
        <Demo />
      </div>
    </main>
  );
}
