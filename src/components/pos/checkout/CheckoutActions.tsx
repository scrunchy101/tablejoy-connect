
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface CheckoutActionsProps {
  onCancel: () => void;
  onCheckout: () => void;
  isProcessing: boolean;
  total: number;
}

export const CheckoutActions = ({
  onCancel,
  onCheckout,
  isProcessing,
  total
}: CheckoutActionsProps) => {
  return (
    <DialogFooter className="flex justify-between gap-3 mt-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="flex-1 border-gray-300 hover:bg-gray-100 text-gray-700"
      >
        Cancel
      </Button>
      <Button 
        onClick={onCheckout}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Processing...
          </>
        ) : (
          <>
            <CheckCircle size={16} className="mr-2" />
            Complete (${total.toFixed(2)})
          </>
        )}
      </Button>
    </DialogFooter>
  );
};
