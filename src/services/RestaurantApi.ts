import { SearchState } from "@/Pages/SearchRestaurantPage";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/my/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Restaurant not found");
    }

    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant"],
    queryFn: getRestaurantByIdRequest,
  });
  return { restaurant, isLoading };
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurant = async () => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/v1/my/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Restaurant not found");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["searchResults", searchState],
    queryFn: searchRestaurant,
  });

  return { results, isLoading };
};
