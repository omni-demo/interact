import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { EventListenerDashboard } from "@/components/EventListenerDashboard";

const Events = () => {
  return (
    <InteractMasterLayout
      currentUser={{
        name: "John Miller",
        role: "project-owner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        tenantId: "bbdo",
        tenantName: "BBDO (and its network including AMV BBDO, adam&eveDDB)",
      }}
    >
      <EventListenerDashboard />
    </InteractMasterLayout>
  );
};

export default Events;
