const  ACCOUNT_TYPE = {
    Amdin:"Admin",
    User:"User"
}
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.User,
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Posts",
    path: "/dashboard/Post",
    type: ACCOUNT_TYPE.User,
    icon: "VscVm",
  },
  {
    id: 3,
    name: "MyPost",
    path: "/dashboard/MyPost",
    type: ACCOUNT_TYPE.User,
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "Admin Profile",
    path: "/admin/my-profile",
    type: ACCOUNT_TYPE.Amdin,
    icon: "VscAccount",
  },
  {
    id: 5,
    name: "Feeds",
    path: "/admin/Feeds",
    type: ACCOUNT_TYPE.Amdin,
    icon: "VscVm",
  },
  {
    id: 6,
    name: "Users",
    path: "/admin/Users",
    type: ACCOUNT_TYPE.Amdin,
    icon: "VscGroupByRefType",
  }
];
