import DashboardSection from "../../components/dashboard-section";
import Main from "../../components/main";

export const metadata = {
  title: "Daily Mood Record · Dashboard",
};

export default function Dashboard() {
  return (
    <Main>
      <DashboardSection></DashboardSection>
    </Main>
  );
}
