import React, { Component, Fragment } from "react";
import defaultBcg from "../images/house-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { HouseContext } from "../context";

import StyledHero from "../components/StyledHero";
export default class SingleHomes extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = HouseContext;

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { getHouse } = this.context;
    const house = getHouse(this.state.slug);

    if (!house) {
      return (
        <div className="error">
          <h3> no such house could be found...</h3>
          <Link to="/houses" className="btn-primary">
            back to houses
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      images
    } = house;
    const [main, ...defaultImages] = images;
    console.log(defaultImages)

    return (
      <Fragment>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} house`}>
            <Link to="/houses" className="btn-primary">
              back to houses
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-house">
          <div className="single-house-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className="single-house-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
            </article>
          </div>
        </section>
        <section className="house-extras">
          <h6>extras </h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>
      </Fragment>
    );
  }
}
