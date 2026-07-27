import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HomeLoginDialog } from "@/components/HomeLoginDialog";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

const Index = () => {
  const [message, setMessage] = useState("");
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsPromptOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#110a1f] via-[#180c3a] to-[#04060f] text-foreground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FF6A5C]/15 to-[#7C4DFF]/0 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-[#E056A7]/15 to-[#7C4DFF]/0 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <HomeLoginDialog />
          </div>
        </nav>

        <section className="mx-auto mt-16 flex w-full max-w-5xl flex-col gap-12 text-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">Build something with AI</p>
            <h2 className="bg-gradient-to-r from-[#FF6A5C] via-[#E056A7] to-[#7C4DFF] bg-clip-text text-5xl font-semibold text-transparent tracking-[-0.04em] sm:text-6xl">
              Ask to build now
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Describe a feature, generate content, or explore a product workflow. Log in to start building with AI.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-[2rem] bg-slate-950/70 p-6 shadow-[0_40px_80px_rgba(15,23,42,0.35)] sm:flex-row sm:items-center sm:p-6">
            <div className="relative flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-w-0 h-16 w-full rounded-2xl border border-white/10 px-6 pr-16 text-sm text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (message.trim()) setIsPromptOpen(true);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => message.trim() && setIsPromptOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <Dialog open={isPromptOpen} onOpenChange={setIsPromptOpen}>
        <DialogContent className="max-w-md p-6 sm:p-8">
          <DialogHeader className="text-center">
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              To send messages and save your work, please log in or continue with Google or GitHub.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <HomeLoginDialog />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Index;
