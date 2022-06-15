import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockLoader = (props) => (
    <div className="pizza-block__wrapper"><ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="285" rx="10" ry="10" width="280" height="30"/>
        <rect x="0" y="332" rx="10" ry="10" width="280" height="88"/>
        <rect x="126" y="430" rx="30" ry="30" width="152" height="45"/>
        <circle cx="138" cy="128" r="128"/>
        <rect x="0" y="437" rx="10" ry="10" width="90" height="30"/>
    </ContentLoader></div>
)

export default PizzaBlockLoader;