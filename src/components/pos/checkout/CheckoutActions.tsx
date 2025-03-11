
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
    <DialogFooter>
      <Button 
        variant="outline" 
        onClick={onCancel}
        className="border-gray-600 hover:bg-gray-600"
      >
        Cancel
      </Button>
      <Button 
        onClick={onCheckout}
        className="bg-green-600 hover:bg-green-700"
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
            Complete Order (${total.toFixed(2)})
          </>
        )}
      </Button>
    </DialogFooter>
  );
};
