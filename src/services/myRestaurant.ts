import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurant = async (): Promise<Restaurant> => {
    const accesToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
    });
    if (!response.ok) throw new Error("Cannot get restaurant");

    return response.json();
  };

  const {
    data: restaurant,
    isLoading,

    isError,
  } = useQuery({ queryKey: ["getRestaurant"], queryFn: getMyRestaurant });

  if (isError) {
    toast.error("Cannot get restaurant");
  }
  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurant = async (
    RestaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accesToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      body: RestaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Cannot perfrom create");
    }

    return response.json();
  };
  const {
    mutate: createRestaurant,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["restaurant"],
    mutationFn: createMyRestaurant,
  });

  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (isError) {
    toast.error("Cannot create restaurant");
  }

  return { createRestaurant, isSuccess, isError, isPending };
};
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurant = async (
    RestaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accesToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accesToken}`,
      },
      body: RestaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Cannot perform update");
    }

    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["restaurant update"],
    mutationFn: updateMyRestaurant,
  });

  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (isError) {
    toast.error("Cannot update restaurant");
  }

  return { updateRestaurant, isSuccess, isError, isPending };
};
