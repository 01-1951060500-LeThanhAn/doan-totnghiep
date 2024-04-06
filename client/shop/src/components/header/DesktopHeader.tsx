import { ShoppingCart } from "lucide-react";
// import {
//   FolderKanban,
//   FolderPen,
//   LogOut,
//   Mail,
//   MessageSquare,
//   PlusCircle,
//   Settings,
//   User,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Link } from "react-router-dom";

const DesktopHeader = () => {
  return (
    <>
      {/* {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <img
                className="w-12 h-12 mr-3 object-cover rounded-full"
                src={""}
                alt=""
              />
              <p>An</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="flex items-center" to={`/user-profile`}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link className="flex items-center" to={`/manage-product`}>
                  <FolderKanban className="mr-2 h-4 w-4" />
                  <span>Manage Menu and product</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span>An</span>
              </DropdownMenuItem>

              
              <DropdownMenuItem>
                <FolderPen className="mr-2 h-4 w-4" />
                <span>thanhan2001</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center ">
          <Button
            variant="outline"
            className="font-semibold mr-3 hover:bg-white hover:text-black"
          >
            Sign Up
          </Button>
          <Button>
            Log In
          </Button>
        </div>
      )} */}

      <div className="flex items-center ">
        <ShoppingCart />
      </div>
    </>
  );
};

export default DesktopHeader;
