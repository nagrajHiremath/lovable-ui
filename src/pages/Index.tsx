import { useState } from "react";
import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HomeAuthDialog } from "@/components/HomeAuthDialog";
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
    <main className="relative min-h-screen overflow-hidden bg-[#03050d] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.62),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(168,85,247,0.52),transparent_26%),radial-gradient(circle_at_72%_78%,rgba(236,72,153,0.42),transparent_26%),radial-gradient(circle_at_24%_74%,rgba(14,165,233,0.34),transparent_30%)] animate-gradient-pan" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(59,130,246,0.16)_0%,rgba(168,85,247,0.26)_35%,rgba(236,72,153,0.18)_65%,rgba(14,165,233,0.14)_100%)] bg-[length:220%_220%] animate-galaxy-flow mix-blend-screen" />
      <div className="pointer-events-none absolute inset-[-20%] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(59,130,246,0.18),rgba(168,85,247,0.1),rgba(236,72,153,0.18),rgba(14,165,233,0.1),rgba(59,130,246,0.18))] blur-[120px] animate-galaxy-spin mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_center,transparent_40%,rgba(3,5,13,0.14)_70%,rgba(3,5,13,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,13,0.02)_0%,rgba(3,5,13,0.1)_38%,rgba(3,5,13,0.5)_100%)]" />
      <div className="pointer-events-none absolute -left-28 top-8 h-[36rem] w-[36rem] rounded-full bg-cyan-400/42 blur-[140px] animate-blob-drift" />
      <div className="pointer-events-none absolute right-[-6rem] top-16 h-[42rem] w-[42rem] rounded-full bg-fuchsia-500/36 blur-[160px] animate-blob-drift [animation-delay:-8s]" />
      <div className="pointer-events-none absolute bottom-[-8rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-violet-400/30 blur-[150px] animate-blob-drift [animation-delay:-14s]" />
      <div className="pointer-events-none absolute left-[12%] top-[62%] h-56 w-56 rounded-full bg-sky-300/20 blur-[100px] animate-blob-drift [animation-delay:-4s]" />
      <div className="pointer-events-none absolute right-[16%] top-[36%] h-48 w-48 rounded-full bg-rose-300/16 blur-[90px] animate-blob-drift [animation-delay:-11s]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <HomeAuthDialog />
          </div>
        </nav>

        <section className="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-8 text-center lg:mt-12">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.45em] text-muted-foreground">Build something with AI</p>
            <h2 className="bg-gradient-to-r from-[#FF6A5C] via-[#E056A7] to-[#7C4DFF] bg-clip-text text-4xl font-semibold text-transparent tracking-[-0.04em] sm:text-6xl">
              Ask to build now
            </h2>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Describe a feature, generate content, or explore a product workflow. Log in to start building with AI.
            </p>
          </div>

          <div className="mx-auto w-full max-w-4xl rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-2.5 shadow-[0_30px_70px_rgba(15,23,42,0.38)] backdrop-blur-xl sm:p-3">
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/80 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-3">
              <div className="relative flex items-center gap-3 rounded-[1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.14),rgba(168,85,247,0.1),rgba(236,72,153,0.14))] p-2 shadow-inner shadow-black/20">

                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (message.trim()) setIsPromptOpen(true);
                    }
                  }}
                />

                <Button
                  type="button"
                  onClick={handleSend}
                  className="h-10 w-10 rounded-[0.85rem] bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.18)] transition hover:bg-cyan-100"
                  aria-label="Send prompt"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

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
            <HomeAuthDialog />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Index;
