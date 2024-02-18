import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
import { DownLine } from "../icons/DownLine";
import { SearchIcon } from "../icons/SearchIcon";

export default function Header4() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} maxWidth="xl" height={'4.5rem'}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="text-4xl font-bold tracking-tight text-black">GIC Archive</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem>
          <Link color="foreground" href="#">
            Class project
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Thesis
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                // endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                More
                <DownLine />
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
            // startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
            // startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
            // startContent={icons.flash}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
            // startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
            // startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
          >
            Class project
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
          >
            Thesis
          </Link>
        </NavbarMenuItem>
        <Dropdown>
          <DropdownTrigger>
            <Link className="w-fit">
              More
              <DownLine />
            </Link>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
            // startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
            // startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
            // startContent={icons.flash}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
            // startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
            // startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarMenu>
    </Navbar>
  );
}
