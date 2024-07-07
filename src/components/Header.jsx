import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import SearchModal from "./SearchModal";
import { SearchIcon } from "../icons/SearchIcon";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tab, setTab] = useState('home');
  // const { setTheme } = useTheme();
  const { data } = useQuery(QUERIES.getMe);
  const location = useLocation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <Link to='/' className=" text-foreground">
            <h1 className="text-4xl font-bold tracking-tight">GIC Archive</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="end">
        <NavbarItem isActive={location.pathname === '/'} onClick={() => setTab('home')} >
          <Link to='/' className={`${location.pathname === '/' ? 'text-blue-500' : ''} cursor-pointer`}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname.startsWith('/classProject')} onClick={() => setTab('classProject')} className={`${tab === 'classProject' ? 'text-blue-500' : ''} cursor-pointer`}>
          <Link to='/classProject' className={`${location.pathname.startsWith('/classProject') ? 'text-blue-500' : ''} cursor-pointer`}>
            Class Project
          </Link>
        </NavbarItem>
        <NavbarItem isActive={location.pathname.startsWith('/thesis')} onClick={() => setTab('thesis')} className={`${tab === 'thesis' ? 'text-blue-500' : ''} cursor-pointer`}>
          <Link to='/thesis' className={`${location.pathname.startsWith('/thesis') ? 'text-blue-500' : ''} cursor-pointer`}>
            Thesis
          </Link>
        </NavbarItem>
        <NavbarItem className={`cursor-pointer`}>
          <a href="https://gic.itc.edu.kh/">About us</a>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="between">
        <Button onPress={onOpen} className=" bg-white">
          <Input
            className="relative float-left"
            classNames={{
              base: "w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </Button>

        <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" hideCloseButton>
          <ModalContent className="bg-[#d1d1d2]">
            {(onClose) => (
              <SearchModal onClose={onClose}/>
            )}
          </ModalContent>
        </Modal>
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
                    <Image className="w-16 rounded-full mb-2 mt-4" src={data.getMe.image} />
                    <h2 className="text-lg font-semibold mt-2 mb-4">{data?.getMe.name}</h2>
                  </div>
                </Link>
              </DropdownItem>
              {data.getMe.role === 'teacher' && (
                <DropdownItem key="settings"><Link to='/teacherDashboard'>Teacher dashboard</Link></DropdownItem>
              )}
              {data.getMe.role === 'admin' && (
                <DropdownItem key="settings"><Link to='/adminDashboard'>Admin dashboard</Link></DropdownItem>
              )}
              {/* <DropdownItem onClick={() => setTheme('light')} key="settings">Light Mode</DropdownItem>
              <DropdownItem onClick={() => setTheme('dark')} key="settings">Dark Mode</DropdownItem> */}
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
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
            to='/'
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
            to='/classProject'
          >
            Class project
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} >
          <Link
            color="foreground"
            className="w-full"
            href="#"
            size="lg"
            to='/thesis'
          >
            Thesis
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Header