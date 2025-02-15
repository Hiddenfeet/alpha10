import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import Loading from "../components/Loading";
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { currency } from "../constants";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import AdminControls from "../components/AdminControls";
import Grid from "../components/Grid";

const Home: NextPage = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { contract, isLoading } = useContract(
    "0x36Bbe7Ec2C3d3c92479F03B1a7607532a7d83aF6"
  );
  const { data: expiration } = useContractRead(contract, "expiration");
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );

  const { data: tickets } = useContractRead(contract, "getTickets");

  const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
    address
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );
  const { data: lastWinner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  const { data: isLotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );

    setUserTickets(noOfUserTickets);
  });

  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying tickets..");

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success("Tickets purchesed successfully!", { id: notification });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing winnings..");

    try {
      const data = await WithdrawWinnings([{}]);
      toast.success("Winning withdraw successfully!", { id: notification });
    } catch (err) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  // if (isLoading) return <Loading />;
  return (
    <>
      <Head>
        <title>Lottery Dapp</title>
        <meta name="description" content="Generated TigTon.cro" />
      </Head>
      <Grid />
    </>
  );
};

export default Home;
