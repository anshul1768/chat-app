
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  // Fetch messages + subscribe to realtime messages
  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Auto scroll to latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* ================= CHAT HEADER ================= */}
      <ChatHeader />

      {/* ================= MESSAGES AREA ================= */}
      <div className="relative min-h-0 flex-1 overflow-y-auto px-3 py-6 sm:px-6">

        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 size-64 rounded-full bg-cyan-500/[0.025] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-72 rounded-full bg-blue-500/[0.025] blur-3xl" />
        </div>

        {/* Messages */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-4">

          {/* ================= MESSAGES ================= */}
          {messages.length > 0 && !isMessagesLoading ? (
            messages.map((msg) => {
              const isMine = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`flex w-full ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >

                  {/* MESSAGE ROW */}
                  <div
                    className={`flex max-w-[85%] gap-2 sm:max-w-[70%] ${
                      isMine ? "flex-row-reverse" : "flex-row"
                    }`}
                  >

                    {/* ================= AVATAR ================= */}
                    <div className="hidden shrink-0 self-end sm:block">
                      <div className="size-8 overflow-hidden rounded-full border border-white/10 bg-slate-800">
                        <img
                          src={
                            isMine
                              ? authUser.profilePic || "/avatar.png"
                              : selectedUser.profilePic || "/avatar.png"
                          }
                          alt={
                            isMine
                              ? authUser.fullName
                              : selectedUser.fullName
                          }
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* ================= MESSAGE CONTENT ================= */}
                    <div className="min-w-0">

                      {/* SENDER NAME */}
                      <div
                        className={`mb-1 flex items-center gap-2 ${
                          isMine
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-semibold ${
                            isMine
                              ? "text-cyan-400"
                              : "text-slate-400"
                          }`}
                        >
                          {isMine
                            ? "You"
                            : selectedUser.fullName}
                        </span>
                      </div>

                      {/* ================= BUBBLE ================= */}
                      <div
                        className={`
                          group relative
                          rounded-2xl
                          px-3 py-2
                          shadow-lg
                          transition-all duration-200
                          ${
                            isMine
                              ? `
                                rounded-br-md
                                bg-gradient-to-br
                                from-cyan-500
                                to-cyan-600
                                text-white
                                shadow-cyan-950/30
                              `
                              : `
                                rounded-bl-md
                                border
                                border-white/[0.06]
                                bg-slate-800/90
                                text-slate-200
                                shadow-black/20
                              `
                          }
                        `}
                      >

                        {/* ================= IMAGE ================= */}
                        {msg.image && (
                          <div className="mb-2 overflow-hidden rounded-xl">
                            <img
                              src={msg.image}
                              alt="Shared"
                              className="
                                max-h-72
                                w-full
                                min-w-[180px]
                                object-cover
                                transition-transform
                                duration-300
                                group-hover:scale-[1.02]
                              "
                            />
                          </div>
                        )}

                        {/* ================= TEXT ================= */}
                        {msg.text && (
                          <p className="whitespace-pre-wrap break-words px-1 text-sm leading-relaxed">
                            {msg.text}
                          </p>
                        )}

                        {/* ================= TIME ================= */}
                        <div
                          className={`
                            mt-1
                            flex
                            items-center
                            justify-end
                            gap-1
                            px-1
                            text-[10px]
                            ${
                              isMine
                                ? "text-cyan-100/70"
                                : "text-slate-500"
                            }
                          `}
                        >
                          <span>
                            {new Date(
                              msg.createdAt
                            ).toLocaleTimeString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>

                          {/* MESSAGE STATUS */}
                          {isMine && (
                            <span className="font-medium text-cyan-100/80">
                              ✓✓
                            </span>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : isMessagesLoading ? (

            /* ================= LOADING ================= */
            <MessagesLoadingSkeleton />

          ) : (

            /* ================= EMPTY CHAT ================= */
            <div className="flex min-h-[400px] items-center justify-center">
              <NoChatHistoryPlaceholder
                name={selectedUser.fullName}
              />
            </div>
          )}

          {/* ================= SCROLL TARGET ================= */}
          <div ref={messageEndRef} />

        </div>
      </div>

      {/* ================= MESSAGE INPUT ================= */}
      <div className="shrink-0 border-t border-white/[0.06] bg-slate-900/70 px-3 py-3 backdrop-blur-xl sm:px-5">
        <MessageInput />
      </div>

    </div>
  );
}

export default ChatContainer;

