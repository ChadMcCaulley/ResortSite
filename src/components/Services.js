import React, { Component } from 'react';
import Title from "./Title";
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa";

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail/>,
                title: "Free Cocktails",
                info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ipsum mi, sagittis nec iaculis eu, interdum vitae lorem. Proin tincidunt risus non risus cursus pharetra."            },
            {
                icon: <FaHiking/>,
                title: "Endless Hiking",
                info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ipsum mi, sagittis nec iaculis eu, interdum vitae lorem. Proin tincidunt risus non risus cursus pharetra."            },
            {
                icon: <FaShuttleVan/>,
                title: "Free Shuttles",
                info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ipsum mi, sagittis nec iaculis eu, interdum vitae lorem. Proin tincidunt risus non risus cursus pharetra."            },
            {
                icon: <FaBeer/>,
                title: "Strongest Beer",
                info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ipsum mi, sagittis nec iaculis eu, interdum vitae lorem. Proin tincidunt risus non risus cursus pharetra."            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services"></Title>
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return (
                        <article key={index} className="service">
                            <span> {item.icon} </span>
                            <h6> {item.title} </h6>
                            <p> {item.info} </p>
                        </article>
                        );
                    })}
                </div>
            </section>
        )
    }
}
