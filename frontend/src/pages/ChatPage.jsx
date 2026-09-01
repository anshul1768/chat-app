import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import { MessageCircleIcon } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="min-h-screen w-full bg-slate-950 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="mx-auto h-[calc(100vh-2rem)] min-h-[600px] max-h-[850px] w-full max-w-7xl">
        <BorderAnimatedContainer>
          <div className="relative flex h-full w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/90 shadow-2xl shadow-black/50 backdrop-blur-2xl">

            {/* LEFT SIDEBAR */}
            <aside className="flex w-[280px] shrink-0 flex-col border-r border-white/[0.08] bg-slate-900/60 md:w-[340px]">

              {/* CHATX BRANDING */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.08]">
                <MessageCircleIcon className="w-7 h-7 text-cyan-400" />

                <h1 className="text-2xl font-bold text-cyan-400">
                  ChatX
                </h1>
              </div>

              {/* PROFILE HEADER */}
              <div className="shrink-0 border-b border-white/[0.08]">
                <ProfileHeader />
              </div>

              {/* TABS */}
              <div className="shrink-0 px-3 pt-3">
                <ActiveTabSwitch />
              </div>

              {/* CHAT / CONTACT LIST */}
              <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700/60">
                {activeTab === "chats" ? (
                  <ChatsList />
                ) : (
                  <ContactList />
                )}
              </div>
            </aside>

            {/* RIGHT CHAT AREA */}
            <main className="relative hidden min-w-0 flex-1 flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950 sm:flex">

              {/* BACKGROUND GLOW */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-32 -top-32 size-72 rounded-full bg-cyan-500/[0.04] blur-3xl" />
                <div className="absolute -bottom-32 -left-32 size-72 rounded-full bg-blue-500/[0.04] blur-3xl" />
              </div>

              {/* CHAT CONTENT */}
              <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col">
                {selectedUser ? (
                  <ChatContainer />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <NoConversationPlaceholder />
                  </div>
                )}
              </div>
            </main>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;