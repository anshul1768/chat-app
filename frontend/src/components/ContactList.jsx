
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id);

        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className="
              group w-full
              flex items-center gap-3
              rounded-2xl
              border border-transparent
              bg-slate-800/40
              p-3
              text-left
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
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ONLINE STATUS */}
              <span
                className={`
                  absolute bottom-0 right-0
                  size-3.5
                  rounded-full
                  border-2 border-slate-900
                  ${
                    isOnline
                      ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                      : "bg-slate-600"
                  }
                `}
              />
            </div>

            {/* CONTACT INFO */}
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                {contact.fullName}
              </h4>

              <p
                className={`mt-0.5 text-xs ${
                  isOnline ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>

            {/* ARROW */}
            <span className="translate-x-1 text-slate-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ContactList;
