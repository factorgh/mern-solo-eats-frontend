import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const MainNavLinks = () => {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex gap-3 hover:text-orange-500">
          <CircleUserRound className="text-orange-600 " />
          {user?.email}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="flex px-3 bg-white flex-1 hover:text-orange-500"
          >
            UserProfile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="bg-orange-500 hover:text-gray-500 font-bold flex-1 "
          >
            logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MainNavLinks;
