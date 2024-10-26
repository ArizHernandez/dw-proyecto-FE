import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Root = () => {
  const { isLogged, logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/auth/sign-in");
  };

  return (
    <>
      <Navbar>
        <NavbarContent>
          <NavbarBrand>
            <Link to="/campaign">
              V<span className="font-bold text-inherit">ING</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {isLogged ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    icon: "text-black/80",
                  }}
                  color="secondary"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  onClick={handleLogout}
                  key="logout"
                  color="danger"
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <>
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                <Link to="/auth/sign-in">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  to="/auth/sign-up"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          </>
        )}
      </Navbar>
      <div>
        <Outlet />
      </div>
    </>
  );
};
