import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Image, Button } from "@nextui-org/react";
import { DownLine } from "../icons/DownLine";
import { SearchIcon } from "../icons/SearchIcon";
import { useState } from "react";
import {useTheme} from "next-themes";
import { Link } from "react-router-dom";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tab, setTab] = useState('home');
  const { setTheme } = useTheme();
  const { loading, error, data } = useQuery(QUERIES.getMe);
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/thesis';
  }

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} maxWidth="xl" height={'4.5rem'}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to='/home' className=" text-foreground">
            <h1 className="text-4xl font-bold tracking-tight">GIC Archive</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem isActive={location.pathname.startsWith('/home')} onClick={() => setTab('home')} >
          <Link to='/home' className={`${location.pathname.startsWith('/home') ? 'text-blue-500' : ''} cursor-pointer`}>
              Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname.startsWith('/classProject')} onClick={() => setTab('classProject')} className={`${tab==='classProject' ? 'text-blue-500' : ''} cursor-pointer`}>
          <Link to='/classProject' className={`${location.pathname.startsWith('/classProject') ? 'text-blue-500' : ''} cursor-pointer`}>
            Class Project
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname.startsWith('/thesis')} onClick={() => setTab('thesis')} className={`${tab==='thesis' ? 'text-blue-500' : ''} cursor-pointer`}>
          <Link to='/thesis' className={`${location.pathname.startsWith('/thesis') ? 'text-blue-500' : ''} cursor-pointer`}>
            Thesis
          </Link>
        </NavbarItem>
        <NavbarItem isActive={tab==='aboutUs'} onClick={() => setTab('aboutUs')} className={`${tab==='aboutUs' ? 'text-blue-500' : ''} cursor-pointer`}>
            About us
        </NavbarItem>
        {/* <NavbarItem isActive={tab==='GIC'} onClick={() => setTab('GIC')} className={`${tab==='GIC' ? 'text-blue-500' : ''} cursor-pointer`}>
            GIC
        </NavbarItem> */}
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
        {data ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src={data.getMe.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="gap-2">
                <Link to='/profile'>
                  <div className="border w-80 rounded-lg h-fit flex flex-col items-center">
                    <Image className="w-16 rounded-full mb-2 mt-4" src={data.getMe.image}/>
                    <h2 className="text-lg font-semibold mt-2 mb-4">{data?.getMe.name}</h2>
                  </div>
                </Link>
              </DropdownItem>
              {data.getMe.role == 'teacher' && (
                <DropdownItem key="settings"><Link to='/teacherDashboard'>Teacher dashboard</Link></DropdownItem>
              )}
              {data.getMe.role == 'admin' && (
                <DropdownItem key="settings"><Link to='/adminDashboard'>Admin dashboard</Link></DropdownItem>
              )}
              <DropdownItem onClick={() => setTheme('light')} key="settings">Light Mode</DropdownItem>
              <DropdownItem onClick={() => setTheme('dark')} key="settings">Dark Mode</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <div>Log in</div>
          </Link>
        )}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
            to='/'
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
            to='/'
          >
            Thesis
          </Link>
        </NavbarMenuItem>
        <Dropdown>
          <DropdownTrigger>
            <Link className="w-fit" to='/'>
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
              description="Real-time metrics to debug issues. Slow query added? We'll show you exactly where."
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

export default Header