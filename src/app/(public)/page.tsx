import { getAllFutbolines } from "@/src/actions/getAllFutbolines";
import { getRanking } from "@/src/actions/getRanking";
import { LandingPage } from "@/src/screens/LandingPage/LandingPage";

export default async function page() {
  const spots = await getAllFutbolines();
  const ranking = await getRanking()
  
  //   const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
  //     next: { revalidate: 60 },
  //   });
  //   const users = await usersRes.json();

  return <LandingPage spots={spots} ranking={ranking}/>;
}
