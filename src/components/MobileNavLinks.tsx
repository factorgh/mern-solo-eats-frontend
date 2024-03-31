import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";

const MobileNavLinks = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full space-y-2 px-5">
      <span className="flex flex-1 gap-3 py-3">
        <CircleUserRound className="text-orange-600" />
        {user?.email}
      </span>
      <Separator />
      <Link
        className=" font-bold flex items-center p-3 hover:text-orange-500"
        to="/manage-restaurant"
      >
        Manage Restaurant
      </Link>
      <Link
        className=" font-bold flex items-center p-3 hover:text-orange-500"
        to="/user-profile"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout().then(() => navigate("/"))}
        className="bg-orange-500  font-bold flex-1 "
      >
        logout
      </Button>
    </div>
  );
};

export default MobileNavLinks;
