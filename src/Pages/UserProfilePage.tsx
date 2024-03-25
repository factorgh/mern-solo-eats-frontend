import UserProfileForm from "@/forms/user-profile-form/UserProfileForms";
import { useGetMyUser, useUpdateMyUser } from "../services/apiClient";

const UserProfilePage = () => {
  const { currentUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  return (
    <UserProfileForm
      currentUser={currentUser}
      isPending={isPending}
      onSave={updateUser}
    />
  );
};

export default UserProfilePage;
