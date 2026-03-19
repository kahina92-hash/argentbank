import FeatureItem from "../FeatureItem"
import { featuresData } from "../../data/mockData"

function Features() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((item, index) => (
        <FeatureItem
          key={`${index}-feature`}
          icon={item.image}
          title={item.title}
          description={item.text}
        />
      ))}
    </section>
  )
}

export default Features
