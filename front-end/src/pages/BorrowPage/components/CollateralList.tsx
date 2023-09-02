import React, { useEffect, useState } from "react";

const CollateralList: React.FC = () => {
  const [collateralList, setCollateralList] = useState("CollateralList");

  useEffect(() => {}, []);

  return (
    <div>
      <p>{collateralList}</p>
    </div>
  );
};

export default CollateralList;
