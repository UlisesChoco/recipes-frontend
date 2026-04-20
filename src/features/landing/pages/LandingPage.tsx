import { LandingCTA } from "../components/LandingCTA";
import { LandingCommunity } from "../components/LandingCommunity";
import { LandingFeatures } from "../components/LandingFeatures";
import { LandingHero } from "../components/LandingHero";
import { LandingHowItWorks } from "../components/LandingHowItWorks";

function LandingPage() {
    return (
        <>
            <LandingHero />
            <LandingHowItWorks />
            <LandingFeatures />
            <LandingCommunity />
            <LandingCTA />
        </>
    );
}

export default LandingPage;