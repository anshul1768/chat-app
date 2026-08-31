
import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/70 px-4 sm:px-6 backdrop-blur-xl">

      {/* USER INFO */}
      <div className="flex min-w-0 items-center gap-3">

        {/* AVATAR */}
        <div className="relative shrink-0">
          <div className="size-11 overflow-hidden rounded-full ring-2 ring-slate-700/70">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* ONLINE DOT */}
          <span
            className={`
              absolute bottom-0 right-0
              size-3
              rounded-full
              border-2 border-slate-900
              ${isOnline ? "bg-emerald-400" : "bg-slate-600"}
            `}
          />
        </div>

        {/* NAME + STATUS */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-100">
            {selectedUser.fullName}
          </h3>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                isOnline ? "bg-emerald-400" : "bg-slate-600"
              }`}
            />

            <p
              className={`text-xs ${
                isOnline ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedUser(null)}
        aria-label="Close conversation"
        className="
          group
          flex size-9 items-center justify-center
          rounded-full
          border border-transparent
          text-slate-500
          hover:border-white/10
          hover:bg-slate-800
          hover:text-slate-200
          active:scale-95
          transition-all
        "
      >
        <XIcon className="size-5 transition-transform group-hover:rotate-90" />
      </button>
    </div>
  );
}

export default ChatHeader;

