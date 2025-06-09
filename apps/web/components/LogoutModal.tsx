"use client";

import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface LogoutModalProps {
  onLogout: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const LogoutModal = ({ onLogout, open, setOpen }: LogoutModalProps) => {
  return (
    <div className="mt-8 flex justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Sign out</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-lg text-gray-500 mt-2 mb-6">
            You are about to sign out of your account. Do you want to continue?
          </DialogDescription>
          <DialogFooter className="flex flex-row gap-4 justify-end">
            <DialogClose asChild>
              <button className="px-8 py-3 rounded-md bg-gray-100 text-black font-semibold">
                Cancel
              </button>
            </DialogClose>
            <button
              className="px-8 py-3 rounded-md bg-red-500 text-white font-semibold"
              onClick={() => {
                onLogout();
                setOpen(false);
              }}
            >
              Sign out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogoutModal;
