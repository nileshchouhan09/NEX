import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  img?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  img,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">

        <div className="flex flex-col gap-6">
            {
                img && (
                    <div className="flex justify-center">
                    <Image
                    src={img}
                    height={72}
                    width={72}
                    alt={"image"}
                    />
                    </div>
  )
            }
            <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
            {children}
            <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
                {buttonIcon && (
                <Image src={buttonIcon}
                width={13}
                height={13}
                alt={"icon"}
                />)}
                
                {buttonText || 'Schedule Meeting'}</Button>
        </div>
       
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
