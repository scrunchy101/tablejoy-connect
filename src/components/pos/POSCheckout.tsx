
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Banknote, WifiOff, Wifi } from "lucide-react";
import { usePayment } from "./PaymentProcessor";

interface POSCheckoutProps {
  total: number;
  onClose: () => void;
  onProcessPayment: (customerName: string, paymentMethod: string) => Promise<boolean>;
}

export const POSCheckout: React.FC<POSCheckoutProps> = ({
  total,
  onClose,
  onProcessPayment
}) => {
  const [customerName, setCustomerName] = useState("");
  const [processing, setProcessing] = useState(false);
  const { connectionStatus, checkConnection } = usePayment();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      // Always use Cash as payment method
      const success = await onProcessPayment(customerName, "Cash");
      if (!success) {
        setProcessing(false);
      }
    } catch (error) {
      console.error("Error in transaction processing:", error);
      setProcessing(false);
    }
  };
  
  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Checkout</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              disabled={processing}
            >
              <X size={16} />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Complete your order by providing customer information.
          </DialogDescription>
        </DialogHeader>
        
        {/* Connection Status */}
        <div className={`flex items-center gap-2 py-2 px-3 rounded text-sm mb-4 ${connectionStatus.connected ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
          {connectionStatus.connected ? (
            <>
              <Wifi size={16} className="text-green-400" />
              <span>Connected to database</span>
            </>
          ) : (
            <>
              <WifiOff size={16} className="text-red-400" />
              <span>Not connected to database</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => checkConnection()} 
                className="ml-auto text-xs h-7 bg-gray-700 border-gray-600 hover:bg-gray-600"
              >
                Retry
              </Button>
            </>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex justify-between mb-6 pb-2 border-b border-gray-700">
              <span className="text-lg">Total Amount:</span>
              <span className="text-lg font-bold text-green-400">
                TZS {total.toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer Name (Optional)
                </label>
                <Input 
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={processing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <div className="bg-gray-700 border border-gray-600 rounded-md p-3 flex items-center gap-2">
                  <Banknote size={18} className="text-green-400" />
                  <span>Cash</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={processing || !connectionStatus.connected}
            >
              {processing ? "Processing..." : "Complete Order"}
            </Button>
            {!connectionStatus.connected && (
              <p className="text-xs text-center mt-2 text-red-400">
                Cannot process orders without database connection
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
