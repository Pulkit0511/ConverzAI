"use client";

import { useTRPC } from "@/trpc/client";
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CallUI } from "./call-ui";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const client = useMemo(() => {
    if (!userId) return null;

    return new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });
  }, [userId, userName, userImage, generateToken]);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!client) return;

    let cancelled = false;

    const connect = async () => {
      await client.connectUser(
        {
          id: userId,
          name: userName,
          image: userImage,
        },
        generateToken
      );

      if (!cancelled) setIsConnected(true);
    };

    connect();

    return () => {
      cancelled = true;
      setIsConnected(false);
      client.disconnectUser();
    };
  }, [client, userId, userName, userImage, generateToken]);

  const call: Call | null = useMemo(() => {
    if (!client || !isConnected) return null;

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();

    return _call;
  }, [client, isConnected, meetingId]);

  useEffect(() => {
    return () => {
      if (call && call.state.callingState !== CallingState.LEFT) {
        call.leave();
        call.endCall();
      }
    };
  }, [call]);

  if (!client || !isConnected || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
