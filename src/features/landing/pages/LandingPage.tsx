import { LandingCTA } from "../components/LandingCTA";
import { LandingCommunity } from "../components/LandingCommunity";
import { LandingFeatures } from "../components/LandingFeatures";
import { LandingHero } from "../components/LandingHero";
import { LandingHowItWorks } from "../components/LandingHowItWorks";
import { LandingTrust } from "../components/LandingTrust";

function LandingPage() {
    return (
        <>
            <LandingHero />
            <LandingHowItWorks />
            <LandingFeatures />
            <LandingCommunity />
            <LandingTrust />
            <LandingCTA />
        </>
    );
}

export default LandingPage;