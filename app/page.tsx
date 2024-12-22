import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import IndexCard from "@/components/indexCard";
import Index from "@/components";
import InvestmentSummary from "@/components/investments";
import TopGainers from "@/components/topgainers";

export default function Home() {
  return (
    <section className="w-full h-screen relative">
      {/* left section */}
      <div>
        {/* Indices */}
        <div>
              <Index />
        </div>
      </div>
      {/* right section  */}
      <div className="absolute m-10 right-0">
        <InvestmentSummary/>
      </div>
      <div className="absolute m-10 left-0 w-[700px]">
        <TopGainers/>
      </div>
    </section>
  );
}
