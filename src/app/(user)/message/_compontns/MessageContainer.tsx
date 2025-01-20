"use client";
import { Input } from "@/components/ui/input";
import ReceiverMsgCard from "./ReceiverMsgCard";
import UserCard from "./UserCard";
import Image from "next/image";
import { MessageCircleMore, MoveLeft, SendHorizontal, X } from "lucide-react";
import OwnerMsgCard from "./OwnerMsgCard";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketContextApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { PhotoUpload } from "@/components/shared/upload-photo";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { TMessage } from "@/types";
import CustomAvatar from "@/components/shared/CustomAvatar";
import useMultipleFileUpload from "@/hooks/useMultipleFileUpload";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useGetSingleUserProfileQuery } from "@/redux/api/userProfileApi";

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  isImage: boolean;
}

const MessageContainer = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [chatListLoading, setChatListLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessage] = useState<any>([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [chatId, setChartId] = useState<any>(null);
  const [selectedUserId, setSelectedUserId] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const chatBoxRef = useRef(null);
  // const [typing, setTyping] = useState([]);
  // const [search, setSearch] = useState("");
  const { socket } = useSocket();
  const user: any = useAppSelector((state) => state.auth.user);
  const [upload] = useMultipleFileUpload();
  const { register, handleSubmit, reset } = useForm();
  const userFrom = useSearchParams().get("userFrom");
  const fromUserProfile = useGetSingleUserProfileQuery(userFrom || undefined);
  const formUserProfileData = fromUserProfile?.data?.data || null;
  const [reEmit, setReEmit] = useState(false);

  // ==================================== on my chart list ==============================================
  useEffect(() => {
    setChatListLoading(true);
    if (socket && user?.id) {
      socket.on(`my-chat-list::${user?.id}`, (res) => {
        setChatList(res?.data);
        setChatListLoading(false);
      });
    }

    return () => {
      socket.off(`my-chat-list::${user?.id}`, (res) => {
        setChatList(res?.data);
        setChatListLoading(false);
      });
    };
  }, [socket, user?.id]);

  // ================================== Listen for active user =============================================
  useEffect(() => {
    if (socket && user?.id) {
      socket.on("active-users", (res) => {
        setActiveUser(res?.data);
      });
    }

    return () => {
      if (socket && user?.id) {
        socket.off("active-users", (res) => {
          setActiveUser(res?.data);
        });
      }
    };
  }, [socket, user?.id]);

  // ==================================== Get chart list ==============================================
  useEffect(() => {
    if (socket && user?.id) {
      socket.emit("my-chat-list");
    }
  }, [socket, user?.id]);

  // ==================================== emit active list ==============================================
  useEffect(() => {
    if (socket && user?.id) {
      socket.emit("active-users", {}, () => {
        // nothing do
      });
    }
  }, [socket, user?.id]);

  // ================================== Listen for message ==============================================
  useEffect(() => {
    setMessageLoading(true);
    if (socket && user?.id) {
      socket.on(`messages::${user?.id}`, (res) => {
        setMessage(res?.data);
        setMessageLoading(false);
      });
    }
    setMessageLoading(false);

    return () => {
      if (socket && user?.id && chatId) {
        socket.off(`messages::${user?.id}`, (res) => {
          setMessage(res?.data);
          setMessageLoading(false);
        });
      }
    };
  }, [socket, user?.id, chatId, selectedUserId, reEmit]);

  // ================================== emit message ==============================================
  useEffect(() => {
    if (socket && user?.id) {
      socket.emit("messages", { receiverId: selectedUserId }, (res: any) => {
        // nothing do
      });
    }
  }, [socket, user?.id, chatId, selectedUserId, reEmit]);

  // ==================================== set file upload file ==============================================
  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages);
  };

  const removeImage = (id: string) => {
    const updatedImages = uploadedImages.filter((image) => image.id !== id);
    setUploadedImages(updatedImages);
    handleImagesChange(updatedImages);
  };

  // ==================================== set selected user ids ==============================================
  useEffect(() => {
    if (selectedUser || userFrom) {
      setChartId(selectedUser?.message?.chatId);
      setSelectedUserId(selectedUser?.userData?.userId || userFrom);
    }
  }, [selectedUser, userFrom]);

  // =================================== submit message ==============================================
  const handleSendMessage = async (data: any) => {
    if (images?.length > 0) {
      const files = images?.map((image) => image.file);
      const res = await upload(files);
      const uploadFiles = res?.data?.map((file: any) => file?.url);

      const payload = {
        content: data?.message,
        receiverId: selectedUserId,
        files: uploadFiles,
      };

      if (socket && user?.id && selectedUserId) {
        socket.emit("send-message", payload, () => {
          // nothing do
        });
        reset();
        setImages([]);
        setUploadedImages([]);
        setReEmit(!reEmit);
        return;
      }
    }

    const payload = {
      content: data?.message,
      receiverId: selectedUserId,
    };
    if (socket && user?.id && selectedUserId) {
      socket.emit("send-message", payload, async () => {
        // nothing do
      });
      reset();
      setReEmit(!reEmit);
    }
  };

  // ===================================== listen for new message ===============================================
  // useEffect(() => {
  //   if (socket && user?.id && chatId) {
  //     socket.on(`new-message::${user?.id}`, (res) => {
  //       if (!res?.data) return null;
  //       if (messages?.data?.length > 0) {
  //         return setMessage([...messages, res?.data]);
  //       }
  //       setMessage([...messages, res?.data]);
  //     });
  //   }

  //   return () => {
  //     if (socket && user?.id && chatId) {
  //       socket.off(`new-message::${user?.id}`, (res) => {
  //         if (!res?.data) return null;
  //         if (messages?.data?.length > 0) {
  //           return setMessage([...messages, res?.data]);
  //         }
  //         setMessage([...messages, res?.data]);
  //       });
  //     }
  //   };
  // });

  // ===================================== scroll to bottom of chat box ==============================================
  useEffect(() => {
    if (messages) {
      if (chatBoxRef.current) {
        // @ts-ignore
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // ================================== isActive user ==============================================
  useEffect(() => {
    if (activeUser) {
      const isActiveUser = activeUser?.find(
        (item: any) => item?.id === selectedUserId
      );

      setIsActive(isActiveUser ? true : false);
    }
  }, [activeUser, selectedUserId]);

  // ===================================== message seen  emit ==============================================
  useEffect(() => {
    if (socket && user?.id) {
      socket.emit("seen", { chatId: chatId }, (res: any) => {
        // nothing do
      });
    }
  }, [socket, user?.id, messages]);

  // ===================================== listen for typing users ==============================================
  // useEffect(() => {
  //   if (socket && user?.id) {
  //     socket.on(`typing::${chatId}`, (res) => {
  //       setTyping(res?.data);
  //     });
  //   }

  //   return () => {
  //     if (socket && user?.id) {
  //       socket.off(`typing::${chatId}`, (res) => {
  //         setTyping(res?.data);
  //       });
  //     }
  //   };
  // }, [socket, user?.id]);

  // ==================================== typing emit ==============================================
  // useEffect(() => {
  //   if (socket && user?.id) {
  //     socket.emit("typing", { chatId: chatId }, (res: any) => {
  //       // nothing do
  //     });
  //   }
  // }, [socket, user?.id]);

  // ==================================== typing emit ==============================================
  // const handleInputFocus = () => {
  //   if (socket && user?.id) {
  //     socket.emit("typing", { chatId: chatId }, (res: any) => {
  //       // nothing do
  //     });
  //   }
  // };
  // ==================================== stop typing emit ==============================================
  // const handleInputBlur = () => {
  //   if (socket && user?.id) {
  //     socket.emit("stop-typing", { chatId: chatId }, (res: any) => {
  //       // nothing do
  //     });
  //   }
  // };

  // ========================== set selected user profile form outside user ============================
  useEffect(() => {
    if (formUserProfileData) {
      const fromUserProfile = {
        message: null,
        unseen: null,
        unseenMessage: null,
        userData: {
          babysitter: formUserProfileData?.babysitter
            ? {
                firstName: formUserProfileData?.babysitter?.firstName,
                lastName: formUserProfileData?.babysitter?.lastName,
              }
            : null,
          familyUser: formUserProfileData?.familyUser
            ? {
                personName: formUserProfileData?.familyUser?.personName,
              }
            : null,
          profilePicture: formUserProfileData?.profilePicture,
        },
      };

      if (!selectedUser && !messageLoading) {
        setSelectedUser(fromUserProfile);
      }
    }
  }, [formUserProfileData, userFrom]);

  return (
    <div className="lg:mx-auto">
      <div className="relative z-10 flex flex-col rounded-xl rounded-t-xl lg:border-t-8 lg:border-t-primary-orange  md:px-10 lg:py-8 lg:flex-row">
        {/* left */}
        <div
          className={cn(
            "border-opacity-[40%] pr-2 xl:w-[25%] lg:w-[35%] lg:border-r-2 lg:border-gray-300 lg:block",
            selectedUserId ? "hidden" : "block"
          )}
        >
          <div className="border-t-black flex items-end gap-x-5 border-b border-opacity-[40%] py-4 text-black">
            <h4 className="md:text-2xl text-xl font-bold">Messages</h4>
          </div>

          <div className="mx-auto mb-10 mt-4 w-[95%]">
            {/* <Input
              placeholder="Search messages"
              className="w-full rounded-xl border  bg-transparent px-2 py-6 "
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            {/* =============================== display charlist =============================== */}
            <div className="scroll-hide mt-8  max-h-[70vh] min-h-[65vh] space-y-5 overflow-auto">
              {chatListLoading ? (
                <>
                  {Array.from({ length: 10 }, (_, i) => (
                    <div className="flex gap-x-2">
                      <Skeleton className="h-[40px] bg-gray-300/60 rounded-full w-[15%]"></Skeleton>
                      <Skeleton className="h-[40px] bg-gray-300/60 flex-1"></Skeleton>
                    </div>
                  ))}
                </>
              ) : (
                chatList &&
                chatList?.map((chatData: any) => (
                  <UserCard
                    setSelectedUser={setSelectedUser}
                    selectedUserId={selectedUserId}
                    key={chatData?.id}
                    user={{
                      userData: chatData?.participants?.[0],
                      message: chatData?.lastMessage,
                      unseen: chatData?.unseenMessageCount ? true : false,
                      unseenMessage: chatData?.unseenMessageCount,
                    }}
                  ></UserCard>
                ))
              )}
            </div>
          </div>
        </div>

        {/* right */}
        <div
          className={cn(
            "scroll-hide flex h-full flex-col justify-between rounded-tl-lg lg:block  lg:flex-grow",
            selectedUserId ? "block" : "hidden"
          )}
        >
          {!selectedUserId ? (
            <div className="flex h-[80vh] items-center justify-center">
              <div className="flex items-center gap-x-3 font-dm-sans text-2xl">
                <MessageCircleMore size={28} /> Select your partner to start
                conversations
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "scroll-h flex flex-col justify-between lg:flex-grow lg:px-8"
              )}
            >
              <p
                className="lg:hidden cursor-pointer"
                onClick={() => {
                  setSelectedUserId(null);
                  setChartId(null);
                }}
              >
                <MoveLeft size={28} />
              </p>
              <div className="border-t-black flex items-center justify-between border-b border-opacity-[40%] pb-2">
                <div className="flex items-center gap-x-2">
                  <div>
                    <CustomAvatar
                      img={selectedUser?.userData?.profilePicture}
                      name={
                        selectedUser?.userData?.familyUser?.personName ||
                        selectedUser?.userData?.babysitter?.firstName
                      }
                      className=" size-14  rounded-full "
                    ></CustomAvatar>
                  </div>

                  <div className="lg:flex-grow">
                    <h3 className="text-lg md:text-xl font-semibold text-black truncate">
                      {selectedUser?.userData?.familyUser?.personName ||
                        selectedUser?.userData?.babysitter?.firstName +
                          " " +
                          selectedUser?.userData?.babysitter?.lastName}
                    </h3>

                    {isActive ? (
                      <div className=" flex items-center gap-x-1">
                        <div className="size-3 rounded-full bg-green-500" />
                        <p className="text-black border-t-black">Online</p>
                      </div>
                    ) : (
                      <div className=" flex items-center gap-x-1">
                        <div className="size-3 rounded-full bg-yellow-500" />
                        <p className="text-black border-t-black">Offline</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* <button className="flex items-center gap-x-1">
                  <CircleOff size={20} color="#d55758" />
                </button> */}
              </div>

              <div
                className={cn(
                  "scroll-hide space-y-1 pt-8  max-h-[65vh] min-h-[65vh]  overflow-auto"
                )}
                ref={chatBoxRef}
              >
                {messageLoading ? (
                  <div className="space-y-1">
                    {Array.from({ length: 20 }, (_, i) =>
                      i % 2 === 0 ? (
                        <div className="flex items-start gap-x-2 " key={i}>
                          <div
                            className={cn(
                              "md:max-w-[49%] max-w-[75%] space-y-3 overflow-hidden flex-1"
                            )}
                          >
                            <Skeleton className="h-[25px] flex-1"></Skeleton>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex flex-row-reverse items-start gap-x-4"
                          key={i}
                        >
                          <div
                            className={cn(
                              "md:max-w-[49%] max-w-[75%] space-y-3 overflow-hidden flex-1"
                            )}
                          >
                            <Skeleton className="h-[25px] flex-1"></Skeleton>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  messages?.map((message: TMessage, index: number) => {
                    const isPreviousMessageFromSameSender =
                      index > 0 &&
                      messages[index - 1]?.senderId === message.senderId;

                    const showAvatar =
                      !isPreviousMessageFromSameSender || index === 0; // Show avatar only if it's the first in a series or the first message overall.

                    return message?.senderId !== user?.id ? (
                      <div
                        className="flex items-start gap-x-2"
                        key={message.id}
                      >
                        {showAvatar && (
                          <CustomAvatar
                            img={selectedUser?.userData?.profilePicture}
                            name={
                              selectedUser?.userData?.familyUser?.personName ||
                              selectedUser?.userData?.babysitter?.firstName
                            }
                            className="size-8 rounded-full"
                          />
                        )}
                        <div
                          className={cn(
                            "md:max-w-[50%] max-w-[75%] space-y-3 overflow-ellipsis",
                            !showAvatar && "pl-10"
                          )}
                        >
                          <ReceiverMsgCard
                            message={message?.content}
                            files={
                              message?.files?.length ? message?.files : null
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex flex-row-reverse items-start gap-x-4"
                        key={message.id}
                      >
                        <div className="flex md:max-w-[50%] max-w-[75%] flex-col items-end space-y-1 break-words">
                          <OwnerMsgCard
                            message={message?.content}
                            files={
                              message?.files?.length ? message?.files : null
                            }
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="mt-5 relative">
                {uploadedImages?.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4   bg-gray-200 w-full px-10">
                    {uploadedImages?.map((image) => (
                      <div
                        key={image.id}
                        className="relative group flex flex-col justify-center items-center gap-x-2 py-2"
                      >
                        {image?.isImage && (
                          <Image
                            src={image?.previewUrl}
                            alt="Uploaded preview"
                            width={1200}
                            height={1200}
                            className="rounded-lg md:max-w-44 w-auto mx-auto h-20 max-w-36"
                          />
                        )}

                        {!image?.isImage && (
                          <p className=" max-w-[200px] truncate text-[14px]">
                            {image?.file?.name}
                          </p>
                        )}

                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-100 transition-opacity z-30"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        <div className="absolute inset-0 bg-black/5 opacity-100 transition-opacity rounded-lg" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex w-full items-center gap-x-3">
                  <div>
                    <PhotoUpload
                      onImagesChange={handleImagesChange}
                      uploadedImages={uploadedImages}
                      setUploadedImages={setUploadedImages}
                    />
                  </div>

                  <form
                    onSubmit={handleSubmit(handleSendMessage)}
                    className="flex flex-col w-full items-stretch gap-x-4 relative"
                  >
                    <div>
                      <Input
                        placeholder="Type a message"
                        type="text"
                        className="w-full border-2 border-black/50 bg-transparent px-4 py-6 rounded-3xl"
                        {...register("message", {
                          required: images.length > 0 ? false : true,
                        })}
                        // onFocus={handleInputFocus}
                        // onBlur={handleInputBlur}
                      />
                      {/* 
                      <AutosizeTextarea
                        placeholder="Type a message"
                        className="w-full border-2 bg-transparent rounded-3xl"
                        {...register("message", {
                          required: images.length > 0 ? false : true,
                        })}
                        maxHeight={150}
                      ></AutosizeTextarea> */}

                      <Button className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-primary-orange px-3">
                        <SendHorizontal size={20} color="#fff" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
