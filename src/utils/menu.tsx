import { Assessment, CalendarMonth, Group, Home } from "@mui/icons-material"

export const menu = () => {

  const menuItems = [
    {
      path: "/dashboardView",
      title: "Inicio",
      icon: <Home />
    },
    {
      title: "Eventos",
      permission: "show-rent",
      group: [
        {
          path: "/calendarView",
          title: "Calendario",
          icon: <CalendarMonth />,
          permission: "show-rates"
        },
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Personas",
      permission: "show-rent",
      group: [
        {
          path: "/guestView",
          title: "Ponentes",
          icon: <Group />,
          permission: "show-halls"
        },
        {
          path: "/speakerView",
          title: "Invitados",
          icon: <Group />,
          permission: "show-halls"
        },
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Adminstradores",
      permission: "show-rent",
      group: [
        {
          path: "/staffView",
          title: "Usuarios",
          icon: <Group />,
          permission: "show-halls"
        },
        {
          path: "/rolesView",
          title: "Roles",
          icon: <Group />,
          permission: "show-halls"
        },
        {
          path: "/permissionsView",
          title: "Permisos",
          icon: <Group />,
          permission: "show-halls"
        },
      ].filter(groupItem => groupItem !== undefined)
    },
    {
      title: "Reportes",
      permission: "show-rent",
      group: [
        {
          path: "/reportView",
          title: "Reportes",
          icon: <Assessment />,
          permission: "show-halls"
        }
      ].filter(groupItem => groupItem !== undefined)
    },
  ]
  return menuItems.filter(item => item !== undefined);
}