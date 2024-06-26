import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Order } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["fetchMyOrders"],
    queryFn: getMyOrdersRequest,
    retry: 10,
  });

  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionFn = async (
    createCheckoutSessionRequest: CheckoutSessionRequest
  ) => {
    const token = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/v1/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createCheckoutSessionRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Couldnt finish checkout");
    }
    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isPending,
    error,
  } = useMutation({
    mutationFn: createCheckoutSessionFn,
  });

  if (error) {
    toast.error(error.toString());
  }
  return { createCheckoutSession, isPending };
};
