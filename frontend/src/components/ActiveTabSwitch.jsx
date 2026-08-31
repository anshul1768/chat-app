
import { MessageCircle, Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-1.5">

      <div className="grid grid-cols-2 gap-1">

        {/* CHATS */}
        <button
          onClick={() => setActiveTab("chats")}
          className={`
            flex items-center justify-center gap-2
            rounded-xl
            px-3 py-2.5
            text-sm font-medium
            transition-all duration-200
            ${
              activeTab === "chats"
                ? "bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/10"
                : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
            }
          `}
        >
          <MessageCircle className="size-4" />
          <span>Chats</span>
        </button>

        {/* CONTACTS */}
        <button
          onClick={() => setActiveTab("contacts")}
          className={`
            flex items-center justify-center gap-2
            rounded-xl
            px-3 py-2.5
            text-sm font-medium
            transition-all duration-200
            ${
              activeTab === "contacts"
                ? "bg-cyan-500/15 text-cyan-300 shadow-sm shadow-cyan-500/10"
                : "text-slate-500 hover:bg-slate-800/60 hover:text-slate-300"
            }
          `}
        >
          <Users className="size-4" />
          <span>Contacts</span>
        </button>

      </div>
    </div>
  );
}

export default ActiveTabSwitch;

