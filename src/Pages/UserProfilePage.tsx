import UserProfileForm from "@/forms/user-profile-form/UserProfileForms";
import { useGetMyUser, useUpdateMyUser } from "../services/apiClient";

const UserProfilePage = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  if (isLoading || !currentUser) {
    return <div>Loading...</div>;
  }
  return (
    <UserProfileForm
      currentUser={currentUser}
      isPending={isPending}
      onSave={updateUser}
    />
  );
};

export default UserProfilePage;
