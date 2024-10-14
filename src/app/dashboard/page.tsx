import DashboardSection from "../../components/dashboard-section";
import Main from "../../components/main";
import SignIn from "../../components/sign-in";

export const metadata = {
  title: "Daily Mood Record · Dashboard",
};

export default function Dashboard() {
  const isAuthenticated = true;

  let children = <SignIn></SignIn>;

  if (isAuthenticated) {
    children = <DashboardSection></DashboardSection>;
  }

  return <Main>{children}</Main>;
}
