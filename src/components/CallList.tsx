// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { useGetCalls } from "../../hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { endedCalls, upcomingCalls, callRecording, isLoading } = useGetCalls();

  const router = useRouter();

  const [recording, setRecording] = useState<CallRecording[]>([]);

  const GetCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recording;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No upcoming Calls";
      case "recording":
        return "no recording";

      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecording.map((meeting) => meeting.queryRecordings()) ?? [],
        );
  
        const recording = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
  
          setRecording(recording)
      } catch (error) {
        toast({
          title:'try again later'
        })
      }
    };
    if (type === "recording") fetchRecordings();
  }, [type,callRecording]);
  if (isLoading) return <Loader />;

  const calls = GetCalls();

  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 20) || meeting?.filename?.substring(0,20)||
              "Personal Meeting"
            }
            date={
              (meeting as Call).state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recording" ? "/icons/play.svg" : undefined}
            buttonText={type === "recording" ? "Play" : "Start"}
            handleClick={
              type === "recording"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            link={
              type === "recording"
                ? meeting.url
                : `${process.env.NEXT_BASE_URL}/meeting/${meeting.id}`
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
