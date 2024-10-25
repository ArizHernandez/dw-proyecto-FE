import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Root = () => {
  const { isLogged, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/auth/sign-in");
  };

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link to="/">
              V<span className="font-bold text-inherit">ING</span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {isLogged ? (
          <>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem isActive>
                <Link to="#" aria-current="page">
                  Customers
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" to="#">
                  Integrations
                </Link>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem>
                <Button onClick={handleLogout} color="primary" variant="flat">
                  Cerrar sesión
                </Button>
              </NavbarItem>
            </NavbarContent>
          </>
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
