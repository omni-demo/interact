import { useParams, useNavigate } from "react-router-dom";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { BriefToProjectMapper } from "@/components/BriefToProjectMapper";

const BriefMapper = () => {
  const { briefId } = useParams<{ briefId: string }>();
  const navigate = useNavigate();

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
      <BriefToProjectMapper
        briefId={briefId || "brief_20260315_001"}
        briefTitle="Spring 2026 Product Launch"
        onComplete={(projectId) => {
          console.log("Project created:", projectId);
          navigate("/");
        }}
        onCancel={() => navigate(-1)}
      />
    </InteractMasterLayout>
  );
};

export default BriefMapper;
