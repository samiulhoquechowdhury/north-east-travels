// client/src/components/Topbar.jsx
import { Plane, Phone, MessageCircle } from "lucide-react";
import { CONTACT_NUMBERS, DEFAULT_WA_TEXT } from "../config/site";
import useScrollDirection from "../hooks/useScrollDirection";

export default function Topbar() {
  const direction = useScrollDirection(); // "up" | "down"
  const isVisible = direction === "up";

  return (
    <div
      className={[
        "fixed top-0 left-0 right-0 z-50", // sits above navbar
        "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900",
        "border-b border-slate-700/50",
        "text-slate-100 text-sm font-medium",
        "transition-all duration-300 ease-out",
        "shadow-lg backdrop-blur-sm",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      ].join(" ")}
      style={{ height: "2.5rem" }} // ~ h-10
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 truncate hidden sm:flex">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30">
            <Plane className="w-3 h-3 text-blue-300" />
          </div>
          <p className="text-slate-200 tracking-wide">
            Plan your northeast getaway with us — best prices & local experts
          </p>
        </div>

        <div className="flex items-center gap-6">
          {CONTACT_NUMBERS.map(({ label, phone, whatsapp }, index) => (
            <div key={label} className="flex items-center gap-4">
              {index > 0 && <div className="w-px h-4 bg-slate-600/50"></div>}

              <a
                href={`tel:${phone}`}
                className="group flex items-center gap-2 px-2 py-1 rounded-md 
                         hover:bg-slate-700/50 transition-all duration-200 
                         hover:shadow-sm border border-transparent hover:border-slate-600/30"
                aria-label={`Call ${label}`}
                title={`Call ${label}`}
              >
                <div
                  className="flex items-center justify-center w-4 h-4 rounded-full 
                              bg-green-500/20 border border-green-400/30 
                              group-hover:bg-green-500/30 group-hover:border-green-400/50
                              transition-all duration-200"
                >
                  <Phone className="w-2.5 h-2.5 text-green-300" />
                </div>
                <span className="hidden md:inline text-slate-200 group-hover:text-white transition-colors">
                  {label}: {phone}
                </span>
                <span className="md:hidden text-slate-200 group-hover:text-white transition-colors">
                  Call
                </span>
              </a>

              <a
                href={`https://wa.me/${whatsapp.replace(
                  /[^\d]/g,
                  ""
                )}?text=${DEFAULT_WA_TEXT}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-2 py-1 rounded-md 
                         hover:bg-slate-700/50 transition-all duration-200 
                         hover:shadow-sm border border-transparent hover:border-slate-600/30"
                aria-label={`WhatsApp ${label}`}
                title={`WhatsApp ${label}`}
              >
                <div
                  className="flex items-center justify-center w-4 h-4 rounded-full 
                              bg-emerald-500/20 border border-emerald-400/30 
                              group-hover:bg-emerald-500/30 group-hover:border-emerald-400/50
                              transition-all duration-200"
                >
                  <MessageCircle className="w-2.5 h-2.5 text-emerald-300" />
                </div>
                <span className="hidden md:inline text-slate-200 group-hover:text-white transition-colors">
                  WhatsApp
                </span>
                <span className="md:hidden text-slate-200 group-hover:text-white transition-colors">
                  WA
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
