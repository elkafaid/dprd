import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const login = useStore((state) => state.login);
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      login({ username: "admin", name: "Admin Keuangan" });
      onClose();
      router.push("/dashboard");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-900 p-6 text-center border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            ✕
          </button>
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Login Admin</h2>
          <p className="text-slate-400 text-sm">Masuk ke portal manajemen DPRD Kab. Mojokerto</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="username"
                  placeholder="Masukkan username Anda"
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 font-medium text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              Masuk
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Gunakan kredensial yang diberikan oleh administrator sistem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
