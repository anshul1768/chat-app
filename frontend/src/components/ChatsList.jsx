
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className="
              group w-full
              flex items-center gap-3
              p-3
              rounded-2xl
              text-left
              border border-transparent
              bg-slate-800/40
              hover:bg-slate-800/80
              hover:border-cyan-400/10
              hover:shadow-lg hover:shadow-cyan-950/20
              transition-all duration-200
              active:scale-[0.98]
            "
          >
            {/* AVATAR */}
            <div className="relative shrink-0">
              <div className="size-12 overflow-hidden rounded-full ring-2 ring-slate-700/70 group-hover:ring-cyan-400/30 transition-all">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ONLINE INDICATOR */}
              <span
                className={`
                  absolute bottom-0 right-0
                  size-3.5
                  rounded-full
                  border-2 border-slate-900
                  ${isOnline ? "bg-emerald-400" : "bg-slate-600"}
                `}
              />
            </div>

            {/* USER INFO */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="truncate text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {chat.fullName}
                </h4>

                {isOnline && (
                  <span className="shrink-0 text-[10px] font-medium text-emerald-400">
                    Online
                  </span>
                )}
              </div>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {isOnline ? "Active now" : "Offline"}
              </p>
            </div>

            {/* ARROW */}
            <svg
              className="size-4 shrink-0 text-slate-600 opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default ChatsList;

