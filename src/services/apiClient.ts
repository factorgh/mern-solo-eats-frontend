import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import { User } from "@/types";

type createMyUser = {
  auth0Id: string;
  email: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyCurrentUser = async (): Promise<User> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Error fetching user");

    return response.json();
  };
  const {
    data: currentUser,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["Fetch current user"], queryFn: getMyCurrentUser });

  return { currentUser, isSuccess, isError, isLoading };
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: createMyUser) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("User cannot be created");

    return response.json();
  };
  const {
    mutate: createUser,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: createUserRequest });
  return { createUser, isSuccess, isError };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({ mutationFn: updateMyUserRequest });

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isPending };
};
