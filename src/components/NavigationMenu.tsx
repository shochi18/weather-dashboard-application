import {Navbar, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem isActive className="border-b-gray-800 border-b-1">
          <Link to="/forecast" color="foreground">
            Forecast
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/history" aria-current="page">
            History
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavigationMenu