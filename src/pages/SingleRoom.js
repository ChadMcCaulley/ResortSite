import React, {Component} from 'react';
import defaultBackground from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import {Link} from "react-router-dom";
import {RoomContext} from "../context";

const shortid = require("shortid");     //provides unique key values for html elements

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBackground: defaultBackground
        }
    }
    // Fix issue with user being placed at bottom of the page
    componentDidMount(){
        window.scroll(0,0);
    }
    static contextType = RoomContext;

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return (
                <div className="error">
                    <h3>No Such Room Could Be Found</h3>
                    <Link to="/rooms" className="btn-primary">
                        Back To Rooms
                    </Link>
                </div>
            )
        }
        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images
        } = room;
        const renderImages = images.map(image => {
            return <img key={shortid.generate()} src={image} alt={name}/>
        });
        const renderExtras = extras.map(extra => {
            return <li key={shortid.generate()}> {extra} </li>;
        });
        return (
            <>
                <StyledHero image={images[0] || this.state.defaultBackground}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            Back to Rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                      {renderImages}  
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3> Details </h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3> Info </h3>
                            <h6> Price: ${price}</h6>
                            <h6> Size: {size} SQFT</h6>
                            <h6> Max Capactity: {capacity} {capacity > 1 ? `People` : `Person`}</h6>
                            <h6> {pets? "Pets Are Allowed" : "No Pets Allowed"}</h6>
                            <h6> {breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6> Extras </h6>
                    <ul className="extras">
                        {renderExtras}
                    </ul>
                </section>
            </>
        )
    }
}