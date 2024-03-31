import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/services/myRestaurant";

const ManageRestaurantPage = () => {
  const { createRestaurant, isPending } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isPending}
    />
  );
};

export default ManageRestaurantPage;
