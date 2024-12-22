"use client";

import { useState } from "react";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function SecondaryNavBar() {
  const [activeItem, setActiveItem] = useState("Stocks");

  const getItemClasses = (isActive: boolean) =>
    `transition-colors ${
      isActive ? "text-primary font-bold" : "text-foreground"
    }`;

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "transition-colors",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeItem === "Stocks"}>
          <Link
            aria-current={activeItem === "Stocks" ? "page" : undefined}
            href="#"
            onClick={() => setActiveItem("Stocks")}
            className={getItemClasses(activeItem === "Stocks")}
          >
            Stocks
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeItem === "Mutual Funds"}>
          <Link
            aria-current={activeItem === "Mutual Funds" ? "page" : undefined}
            href="#"
            onClick={() => setActiveItem("Mutual Funds")}
            className={getItemClasses(activeItem === "Mutual Funds")}
          >
            Mutual Funds
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
