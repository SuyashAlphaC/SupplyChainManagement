// import React from "react";
// import {
//   Navbar,
//   Collapse,
//   Typography,
//   Button,
//   IconButton,
//   List,
//   ListItem,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";
// import {
//   ChevronDownIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   Bars4Icon,
//   SquaresPlusIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/authContext";
// import ConnectWallet from "../components/ConnectWallet";

// const navListMenuItems = [
//   {
//     title: "Products",
//     description: "All your Products",
//     icon: SquaresPlusIcon,
//     href: "/products",
//   },
//   {
//     title: "Quality Check",
//     description: "Meet and learn about our dedication",
//     icon: UserGroupIcon,
//     href: "/qualityCheck",
//   },
//   {
//     title: "Transfer Product",
//     description: "Transfer the product ownership",
//     icon: Bars4Icon,
//     href: "/transferProduct",
//   },
// ];

// function NavListMenu() {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <Menu
//         open={isMenuOpen}
//         handler={setIsMenuOpen}
//         offset={{ mainAxis: 20 }}
//         placement="bottom"
//         allowHover={true}
//       >
//         <MenuHandler>
//           <Typography as="div" variant="small" className="font-medium">
//             <ListItem
//               className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
//               selected={isMenuOpen || isMobileMenuOpen}
//               onClick={() => setIsMobileMenuOpen((cur) => !cur)}
//             >
//               Services
//               <ChevronDownIcon
//                 className={`hidden h-3 w-3 transition-transform lg:block ${
//                   isMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//               <ChevronDownIcon
//                 className={`block h-3 w-3 transition-transform lg:hidden ${
//                   isMobileMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </ListItem>
//           </Typography>
//         </MenuHandler>
//         <MenuList className="hidden rounded-xl lg:block">
//           <ul className="grid flex flex-col gap-y-2 outline-none outline-0">
//             {navListMenuItems.map(({ icon, title, description, href }, key) => (
//               <a href={href} key={key}>
//                 <MenuItem className="flex items-center gap-3 rounded-lg">
//                   <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
//                     {React.createElement(icon, {
//                       strokeWidth: 2,
//                       className: "h-6 text-gray-900 w-6",
//                     })}
//                   </div>
//                   <div>
//                     <Typography
//                       variant="h6"
//                       color="blue-gray"
//                       className="flex items-center text-sm font-bold"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       variant="paragraph"
//                       className="text-xs !font-medium text-blue-gray-500"
//                     >
//                       {description}
//                     </Typography>
//                   </div>
//                 </MenuItem>
//               </a>
//             ))}
//           </ul>
//         </MenuList>
//       </Menu>
//     </React.Fragment>
//   );
// }

// function NavList() {
//   return (
//     <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
//       <Link to="/">
//         <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
//       </Link>
//       <NavListMenu />
//       <Link to="/dashboard">
//         <ListItem className="flex items-center gap-2 py-2 pr-4">
//           Dashboard
//         </ListItem>
//       </Link>
//     </List>
//   );
// }

// export function NavBar() {
//   const [openNav, setOpenNav] = React.useState(false);
//   const { user, logout } = useAuth();

//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   return (
//     <Navbar className="mx-auto px-4 py-2">
//       <div className="flex items-center justify-between text-blue-gray-900">
//         <Typography
//           as="a"
//           href="#"
//           variant="h6"
//           className="mr-4 cursor-pointer py-1.5 lg:ml-2"
//         >
//           Secure X
//         </Typography>
//         <div className="hidden lg:flex">
//           <NavList />
//         </div>
//         <div className="hidden gap-2 lg:flex">
//           <ConnectWallet />
//           {!user && (
//             <Link to="/register">
//               <Button variant="gradient" size="sm" className="cursor-pointer">
//                 Get Started
//               </Button>
//             </Link>
//           )}
//           {user ? (
//             <Button
//               variant="gradient"
//               size="sm"
//               onClick={logout}
//               className="cursor-pointer"
//             >
//               Log Out
//             </Button>
//           ) : (
//             <Link to="/login">
//               <Button variant="gradient" size="sm" className="cursor-pointer">
//                 Login
//               </Button>
//             </Link>
//           )}
//         </div>
//         <IconButton
//           variant="text"
//           color="blue-gray"
//           className="lg:hidden"
//           onClick={() => setOpenNav(!openNav)}
//         >
//           {openNav ? (
//             <XMarkIcon className="h-6 w-6" strokeWidth={2} />
//           ) : (
//             <Bars3Icon className="h-6 w-6" strokeWidth={2} />
//           )}
//         </IconButton>
//       </div>
//       <Collapse open={openNav}>
//         <NavList />
//       </Collapse>
//     </Navbar>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  SquaresPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ConnectWallet from "../components/ConnectWallet";

// Previous NAV_MENU_ITEMS constant remains the same
const NAV_MENU_ITEMS = [
  {
    title: "Products",
    description: "All your Products",
    icon: SquaresPlusIcon,
    href: "/products",
  },
  {
    title: "Quality Check",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    href: "/qualityCheck",
  },
  {
    title: "Transfer Product",
    description: "Transfer the product ownership",
    icon: Bars4Icon,
    href: "/transferProduct",
  },
];

// Previous NavMenuItem component remains the same
const NavMenuItem = ({ icon: Icon, title, description, href }) => (
  <Link to={href}>
    <MenuItem className="flex items-center gap-3 rounded-lg">
      <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
        <Icon strokeWidth={2} className="h-6 w-6 text-gray-900" />
      </div>
      <div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center text-sm font-bold"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="text-xs !font-medium text-blue-gray-500"
        >
          {description}
        </Typography>
      </div>
    </MenuItem>
  </Link>
);

// Previous NavListMenu component remains the same
const NavListMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      offset={{ mainAxis: 20 }}
      placement="bottom"
      allowHover={true}
    >
      <MenuHandler>
        <Typography as="div" variant="small" className="font-medium">
          <ListItem
            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            Services
            <ChevronDownIcon
              className={`hidden h-3 w-3 transition-transform lg:block ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
            <ChevronDownIcon
              className={`block h-3 w-3 transition-transform lg:hidden ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden rounded-xl lg:block">
        <ul className="grid gap-y-2 outline-none outline-0">
          {NAV_MENU_ITEMS.map((item) => (
            <NavMenuItem key={item.href} {...item} />
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

// Previous NavList component remains the same
const NavList = () => (
  <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
    <Link to="/">
      <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
    </Link>
    <NavListMenu />
    <Link to="/dashboard">
      <ListItem className="flex items-center gap-2 py-2 pr-4">
        Dashboard
      </ListItem>
    </Link>
  </List>
);

// Updated AuthButtons component with wallet connection state
const AuthButtons = ({ user, logout, isWalletConnected }) => (
  <div className="hidden gap-2 lg:flex">
    {isWalletConnected ? (
      <ConnectWallet />
    ) : (
      <Button
        variant="gradient"
        size="sm"
        className="cursor-pointer"
        onClick={() =>
          window.ethereum.request({ method: "eth_requestAccounts" })
        }
      >
        Connect Wallet
      </Button>
    )}
    {!user ? (
      <>
        <Link to="/register">
          <Button variant="gradient" size="sm" className="cursor-pointer">
            Get Started
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="gradient" size="sm" className="cursor-pointer">
            Login
          </Button>
        </Link>
      </>
    ) : (
      <Button
        variant="gradient"
        size="sm"
        onClick={logout}
        className="cursor-pointer"
      >
        Log Out
      </Button>
    )}
  </div>
);

// Updated NavBar component with wallet connection handling
export function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          // Get connected accounts
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setIsWalletConnected(accounts.length > 0);

          // Listen for account changes
          window.ethereum.on("accountsChanged", (accounts) => {
            setIsWalletConnected(accounts.length > 0);
          });

          // Listen for chain changes
          window.ethereum.on("chainChanged", () => {
            // Reload the page when the chain changes
            window.location.reload();
          });

          // Listen for disconnect
          window.ethereum.on("disconnect", () => {
            setIsWalletConnected(false);
          });
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          setIsWalletConnected(false);
        }
      } else {
        setIsWalletConnected(false);
      }
    };

    checkWalletConnection();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
        window.ethereum.removeListener("disconnect", () => {});
      }
    };
  }, []);

  return (
    <Navbar className="mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Secure X
        </Typography>
        <div className="hidden lg:flex">
          <NavList />
        </div>
        <AuthButtons
          user={user}
          logout={logout}
          isWalletConnected={isWalletConnected}
        />
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav((prev) => !prev)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
