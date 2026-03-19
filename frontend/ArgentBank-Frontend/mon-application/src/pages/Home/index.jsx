import HeroBanner from "../../components/HeroBanner"
import Features from "../../components/Features"

function Home() {
  return (
    <main className="main">
      <div className="home-content">
        <HeroBanner />
        <Features />
      </div>
    </main>
  )
}

export default Home
