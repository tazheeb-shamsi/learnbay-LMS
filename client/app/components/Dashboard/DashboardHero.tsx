import React, { FC, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../../components/Dashboard/Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
