import { ComponentsSection } from "./components-section"
import { HeroSection } from "./hero-section"
import { HomeFooter } from "./home-footer"
import { InstallSection } from "./install-section"

/** Server component; the only client pieces are the copy button and the header. */
export function HomePage() {
  return (
    <div className="min-h-screen">
      <main id="top" className="pt-14">
        <HeroSection />
        <ComponentsSection />
        <InstallSection />
      </main>
      <HomeFooter />
    </div>
  )
}
