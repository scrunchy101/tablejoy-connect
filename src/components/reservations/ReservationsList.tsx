
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ReservationListHeader } from "./ReservationListHeader";
import { ReservationDateDisplay } from "./ReservationDateDisplay";
import { ReservationsTable } from "./ReservationsTable";
import { Reservation } from "./types";

interface ReservationsListProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const ReservationsList = ({ selectedDate, setSelectedDate }: ReservationsListProps) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">('all');
  const { toast } = useToast();
  
  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      
      // Format the selected date for the query
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Fetch orders for the selected date
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('created_at::date', formattedDate);

      if (error) throw error;
      
      // Transform orders into reservation format with explicit typing
      const formattedReservations: Reservation[] = [];
      
      // Manually map each item to avoid deep type instantiation
      if (data) {
        for (const order of data) {
          formattedReservations.push({
            id: order.id,
            name: order.customer_name || 'Guest',
            people: order.table_number || 2,
            time: new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: format(new Date(order.created_at), 'yyyy-MM-dd'),
            status: (order.status || 'pending') as "confirmed" | "pending" | "cancelled",
            phone: "(No phone on record)",
            tableNumber: order.table_number
          });
        }
      }
      
      setReservations(formattedReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast({
        title: "Error",
        description: "Failed to load reservations data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Use a simple variable to store filtered reservations
  let filteredReservations: Reservation[] = reservations;
  
  // Only filter if not showing all
  if (statusFilter !== 'all') {
    filteredReservations = reservations.filter(res => res.status === statusFilter);
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ReservationListHeader 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />
      
      <ReservationDateDisplay 
        selectedDate={selectedDate} 
        handleDateChange={handleDateChange}
      />

      <div className="p-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading reservations...</p>
          </div>
        ) : (
          <ReservationsTable reservations={filteredReservations} />
        )}
      </div>
    </div>
  );
};
