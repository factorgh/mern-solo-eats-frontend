import UserProfileForm from "@/forms/user-profile-form/UserProfileForms";
import { useGetMyUser, useUpdateMyUser } from "../services/myUserApi";

const UserProfilePage = () => {
  const { currentUser } = useGetMyUser();
  const { updateUser, isPending } = useUpdateMyUser();
  if (!currentUser) {
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
