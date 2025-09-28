import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Companies from "@/components/marketing/companies";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Pricing from "@/components/marketing/pricing";

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            <Companies />
            <Features />
            {/* <Analysis /> */}
            <Pricing />
        </Wrapper>
    )
};

export default HomePage
