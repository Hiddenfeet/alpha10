import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function GridRemainingTickets() {
  const { contract, isLoading } = useContract(
    "0x36Bbe7Ec2C3d3c92479F03B1a7607532a7d83aF6"
  );
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex w-full">
        <h2 className="text-right card-title flex-1">Ticket Remaining</h2>
        <ArrowUpRightIcon className="text-white h-11 m-3" />
      </div>
      <div className="flex space-x-4 flex-1 justify-between px-4">
        <div className="countdown-value">{remainingTickets?.toNumber() ? remainingTickets?.toNumber() : "00"}</div>
      </div>
    </div>
  );
}

export default GridRemainingTickets;
