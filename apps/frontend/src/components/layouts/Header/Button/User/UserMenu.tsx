"use client";

import { Login, PersonAdd } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeveloperMode from "@mui/icons-material/DeveloperMode";
import ExitToApp from "@mui/icons-material/ExitToApp";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PublishIcon from "@mui/icons-material/Publish";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Settings from "@mui/icons-material/Settings";
import { Menu as BaseMenu, ListItemIcon, MenuItem, MenuProps } from "@mui/material";
import { ReactNode, useContext } from "react";

import { AuthContext, User } from "@providers/AuthProvider";
import { DarkModeContext } from "@providers/DarkModeProvider";
import { MediaQueryContext } from "@providers/MediaQueryProvider";

import { useNavigate } from "@utils/navigation";

enum UserRole {
	ADMIN = 2,
	DEVELOPER = 3,
}

interface MenuItem {
	name: string;
	icon: ReactNode;
	onClick: () => void;
}

interface UserMenuProps extends MenuProps {
	user: User | null;
}

export const UserMenu = ({ user, ...props }: UserMenuProps) => {
	const { logout } = useContext(AuthContext);
	const { toggleDarkMode } = useContext(DarkModeContext);
	const { isMedium } = useContext(MediaQueryContext);
	const router = useNavigate();

	const isDesktop = isMedium;
	const userRole = user?.role || 0;

	const goToHome = () => router.navigateTo("/");
	const goToLibrary = () => router.navigateTo("/library");
	const goToFAQ = () => router.navigateTo("/faq");
	const goToUploadPage = () => router.navigateTo("/upload");
	const goToScoreboard = () => router.navigateTo("/leaderboard");
	const goToAccountPage = () => router.navigateTo("/settings/account");
	const goToAdminPanel = () => router.navigateTo("/admin");
	const goToDeveloperPanel = () => router.navigateTo("/developer");
	const goToLoginPage = () => router.navigateTo("/login");
	const goToRegisterPage = () => router.navigateTo("/register");

	const generateMenuItems = (): MenuItem[] => {
		const menuItems: MenuItem[] = [];

		if (!isDesktop) {
			menuItems.push(
				{
					name: "Home",
					icon: <HomeIcon fontSize="small" />,
					onClick: () => {
						const homeElement = document.querySelector("#home");
						window.scrollTo({ top: 0, behavior: "smooth" });
						if (homeElement) {
							homeElement.scrollIntoView({ behavior: "smooth" });
						} else {
							goToHome();
						}
					},
				},
				{
					name: "Library",
					icon: <LibraryBooksIcon fontSize="small" />,
					onClick: () => {
						const libraryElement = document.querySelector("#library");
						if (libraryElement) {
							libraryElement.scrollIntoView({ behavior: "smooth" });
						} else {
							goToLibrary();
						}
					},
				},
				{
					name: "FAQ",
					icon: <HelpIcon fontSize="small" />,
					onClick: () => {
						const faqElement = document.querySelector("#faq");
						if (faqElement) {
							faqElement.scrollIntoView({ behavior: "smooth" });
						} else {
							goToFAQ();
						}
					},
				},
				{
					name: "Contribute",
					icon: <PublishIcon fontSize="small" />,
					onClick: () => {
						const contributeElement = document.querySelector("#contribute");
						if (contributeElement) {
							contributeElement.scrollIntoView({ behavior: "smooth" });
						} else {
							goToUploadPage();
						}
					},
				},
				{
					name: "Leaderboard",
					icon: <ScoreboardIcon fontSize="small" />,
					onClick: () => {
						const scoreboardElement = document.querySelector("#scoreboard");
						if (scoreboardElement) {
							scoreboardElement.scrollIntoView({ behavior: "smooth" });
						} else {
							goToScoreboard();
						}
					},
				},
			);
		}

		menuItems.push({
			name: "Toggle Dark Mode",
			icon: <DarkModeIcon fontSize="small" />,
			onClick: toggleDarkMode,
		});

		if (user) {
			menuItems.push({
				name: "My Account",
				icon: <AccountCircle fontSize="small" />,
				onClick: goToAccountPage,
			});

			if (userRole >= UserRole.ADMIN) {
				menuItems.push({
					name: "Admin Panel",
					icon: <Settings fontSize="small" />,
					onClick: goToAdminPanel,
				});
			}

			if (userRole >= UserRole.DEVELOPER) {
				menuItems.push({
					name: "Developer Panel",
					icon: <DeveloperMode fontSize="small" />,
					onClick: goToDeveloperPanel,
				});
			}

			menuItems.push({
				name: "Log Out",
				icon: <ExitToApp fontSize="small" />,
				onClick: logout,
			});
		} else {
			menuItems.push(
				{
					name: "Log In",
					icon: <Login fontSize="small" />,
					onClick: goToLoginPage,
				},
				{
					name: "Register",
					icon: <PersonAdd fontSize="small" />,
					onClick: goToRegisterPage,
				},
			);
		}

		return menuItems;
	};

	const menuItems = generateMenuItems();

	return (
		<BaseMenu {...props}>
			{menuItems.map(({ name, icon, onClick }) => (
				<MenuItem key={name} onClick={onClick}>
					<ListItemIcon>{icon}</ListItemIcon>
					{name}
				</MenuItem>
			))}
		</BaseMenu>
	);
};
