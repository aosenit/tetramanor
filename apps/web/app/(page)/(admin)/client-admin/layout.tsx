"use client";

import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiSettings, FiLogOut } from "react-icons/fi";
import {
  FaHome,
  FaBuilding,
  FaMoneyCheckAlt,
  FaBell as FaBellSolid,
} from "react-icons/fa";
import Link from "next/link";

const navLinks = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    href: "/(page)/(admin)/client-admin/dashboard",
  },
  {
    name: "Properties",
    icon: <FaBuilding />,
    href: "/(page)/(admin)/client-admin/properties",
  },
  {
    name: "Payments",
    icon: <FaMoneyCheckAlt />,
    href: "/(page)/(admin)/client-admin/payments",
  },
  {
    name: "Notifications",
    icon: <FaBellSolid />,
    href: "/(page)/(admin)/client-admin/notifications",
  },
];

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="100vh" bg="#F8F9FB">
      {/* Sidebar - Desktop */}
      <Box
        as="aside"
        w={{ base: "0", md: "260px" }}
        bg="#181C23"
        color="white"
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        flexShrink={0}
        py={6}
        px={4}
        h="100vh"
        position="fixed"
        top={0}
        zIndex={20}
      >
        <Box mb={10} fontWeight="bold" fontSize="2xl" letterSpacing="wide">
          <img src="/logo.svg" alt="Tetramanor" className="h-8 mb-6" />
        </Box>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} legacyBehavior>
              <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#23272F] transition-colors font-medium text-base">
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-10">
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#23272F] transition-colors font-medium text-base"
          >
            <FiSettings className="text-xl" />
            <span>Settings</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#23272F] transition-colors font-medium text-base"
          >
            <FiLogOut className="text-xl" />
            <span>Sign Out</span>
          </Link>
        </div>
      </Box>

      {/* Sidebar - Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent
          bg="#181C23"
          color="white"
          minH="100vh !important"
          maxH="100vh !important"
        >
          <DrawerBody p={0} className="flex flex-col h-full">
            <Box py={6} px={4} className="flex flex-col h-full">
              <Box
                mb={10}
                fontWeight="bold"
                fontSize="2xl"
                letterSpacing="wide"
              >
                <img src="/logo.svg" alt="Tetramanor" className="h-8 mb-6" />
              </Box>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} legacyBehavior>
                    <a className="flex items-center gap-4 px-6 py-5 rounded-xl hover:bg-[#23272F] transition-colors font-semibold text-lg active:bg-[#23272F]">
                      <span className="text-2xl">{link.icon}</span>
                      <span>{link.name}</span>
                    </a>
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-4 pt-10">
                <Link
                  href="#"
                  className="flex items-center gap-4 px-6 py-5 rounded-xl hover:bg-[#23272F] transition-colors font-semibold text-lg"
                >
                  <FiSettings className="text-2xl" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-6 py-5 rounded-xl hover:bg-[#23272F] transition-colors font-semibold text-lg"
                >
                  <FiLogOut className="text-2xl" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Flex direction="column" flex="1" minH="100vh">
        {/* Top Bar */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          px={{ base: 2, md: 8 }}
          py={{ base: 2, md: 4 }}
          bg="white"
          borderBottom="1px solid #E5E7EB"
          position="sticky"
          top={0}
          zIndex={10}
        >
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              display={{ base: "inline-flex", md: "none" }}
              onClick={onOpen}
              variant="ghost"
              fontSize="2xl"
            />
            <Input
              placeholder="Search..."
              size="md"
              className="rounded-lg bg-[#F8F9FB] border border-gray-200 w-40 md:w-64"
              _focus={{
                borderColor: "#116114",
                boxShadow: "0 0 0 1px #116114",
              }}
            />
          </Flex>
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Notifications"
              icon={<FiBell />}
              variant="ghost"
              fontSize="xl"
            />
            <Flex align="center" gap={2}>
              <Avatar size="sm" name="Damian Price" src="/avatar.png" />
              <span className="font-semibold text-gray-800 hidden md:inline">
                Damian Price
              </span>
              <span className="w-2 h-2 bg-green-500 rounded-full ml-1" />
            </Flex>
          </Flex>
        </Flex>
        {/* Page Content */}
        <Box
          as="main"
          flex="1"
          p={{ base: 1, md: 8 }}
          bg="#F8F9FB"
          className="lg:ml-[260px]"
        >
          <div className="h-screen overflow-y-scroll overflow-x-hidden ">
            {children}
          </div>
        </Box>
      </Flex>
    </Flex>
  );
}
