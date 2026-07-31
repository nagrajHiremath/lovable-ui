import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { api, setAuthToken, setUserInfo } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "signin" | "signup";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
      <path fill="#4285F4" d="M21.35 11.1H12v2.95h5.36c-.24 1.39-1.03 2.57-2.24 3.36v2.79h3.62c2.12-1.95 3.34-4.83 3.34-8.23 0-.79-.07-1.56-.23-2.33z" />
      <path fill="#34A853" d="M12 22c3.03 0 5.57-1 7.43-2.73l-3.62-2.79c-1 .67-2.28 1.06-3.81 1.06-2.93 0-5.42-1.98-6.31-4.65H1.96v2.88A10 10 0 0 0 12 22z" />
      <path fill="#FBBC05" d="M5.69 12.89c-.23-.67-.36-1.38-.36-2.12s.13-1.45.36-2.12V5.77H1.96A10 10 0 0 0 2 20.77l3.69-2.88z" />
      <path fill="#EA4335" d="M12 4.2c1.65 0 3.14.57 4.31 1.69l3.23-3.23A9.95 9.95 0 0 0 12 2 10 10 0 0 0 1.96 5.77l3.73 2.98C6.58 6.18 9.07 4.2 12 4.2z" />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.38 6.84 9.73.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05a9.32 9.32 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.89 0 1.37-.01 2.48-.01 2.82 0 .26.18.59.69.48A10.16 10.16 0 0 0 22 12.24C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function HomeAuthDialog() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.login({ username: email, password });
      setAuthToken(response.token);
      if (response.user) {
        setUserInfo(response.user);
      }
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      setOpen(false);
      navigate("/projects");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Missing details",
        description: "Please fill in name, email, and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.signup({ name, username: email, password });
      setAuthToken(response.token);
      setUserInfo(response.user);
      toast({
        title: "Welcome!",
        description: "Your account is ready",
      });
      setOpen(false);
      navigate("/projects");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Could not create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (value: string) => {
    setMode(value as AuthMode);
    clearForm();
  };

  const switchToMode = (nextMode: AuthMode) => {
    handleModeChange(nextMode);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          clearForm();
          setMode("signup");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full px-8 py-3 text-base">Sign up</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-4 sm:p-5">
        <DialogHeader className="text-center">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="mx-auto mb-2 flex items-center justify-center bg-transparent p-0 shadow-none transition hover:opacity-90 sm:mx-auto"
          >
            <Logo hideText className="scale-100" />
          </button>
        </DialogHeader>

        <div className="mt-1">
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="home-auth-email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="home-auth-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-border/50 bg-muted/50 pl-10 text-sm focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-auth-password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="home-auth-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border-border/50 bg-muted/50 pl-10 text-sm focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full rounded-xl px-6 py-2.5 text-base">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => switchToMode("signup")}
                  className="font-medium text-foreground underline-offset-4 transition hover:underline"
                >
                  Sign up
                </button>
              </div>

              <div className="pt-1">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.assign("/auth/google")}
                    className="flex h-9 items-center justify-center rounded-lg border-0 bg-transparent px-3 shadow-none hover:bg-transparent"
                    aria-label="Continue with Google"
                  >
                    <GoogleLogo />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.assign("/auth/github")}
                    className="flex h-9 items-center justify-center rounded-lg border-0 bg-transparent px-3 shadow-none hover:bg-transparent"
                    aria-label="Continue with GitHub"
                  >
                    <GitHubLogo />
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="home-auth-name" className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="home-auth-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border-border/50 bg-muted/50 pl-10 text-sm focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-auth-signup-email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="home-auth-signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-border/50 bg-muted/50 pl-10 text-sm focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-auth-signup-password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="home-auth-signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border-border/50 bg-muted/50 pl-10 text-sm focus:border-primary"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full rounded-xl px-6 py-2.5 text-base">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchToMode("signin")}
                  className="font-medium text-foreground underline-offset-4 transition hover:underline"
                >
                  Sign in
                </button>
              </div>

              <div className="pt-1">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.assign("/auth/google")}
                    className="flex h-9 items-center justify-center rounded-lg border-0 bg-transparent px-3 shadow-none hover:bg-transparent"
                    aria-label="Continue with Google"
                  >
                    <GoogleLogo />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.assign("/auth/github")}
                    className="flex h-9 items-center justify-center rounded-lg border-0 bg-transparent px-3 shadow-none hover:bg-transparent"
                    aria-label="Continue with GitHub"
                  >
                    <GitHubLogo />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}