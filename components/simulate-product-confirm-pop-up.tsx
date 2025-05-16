"use client";

import { Button } from "./ui/button";

import useSimulationProductPopupStore from "@/stores/useSimulationProductPopupStore";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Dialog } from "./ui/dialog";

export default function SimulateProductConfirmPopUp() {
  const isOpen = useSimulationProductPopupStore((state) => state.isOpen);
  const setIsOpen = useSimulationProductPopupStore((state) => state.setIsOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-chatBackground">
        <DialogTitle className="text-primary-darkForest text-base font-bold">
          Confirm
        </DialogTitle>
        <DialogDescription className="text-primary-darkForest text-base">
          Switching to Product Configuration — simulated setup ready{" "}
        </DialogDescription>
        <DialogFooter>
          <Button
            variant={"secondary"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              window.open("/studio", "_blank");
              setIsOpen(false);
            }}
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
