import { DRAWER_ID } from "./DrawerConstants";
import { DrawerContext } from "./DrawerContext";

export default function DrawerProvider({ children }: React.PropsWithChildren) {
  const closeDrawer = () => {
    const drawerToggle = document.getElementById(DRAWER_ID);
    if (drawerToggle instanceof HTMLInputElement) {
      drawerToggle.checked = false;
    }
  };
  return <DrawerContext.Provider value={{ closeDrawer }}>{children}</DrawerContext.Provider>;
}
