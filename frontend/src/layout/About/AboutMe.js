import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./aboutme.css";
import profile from "../About/profile.jpeg";
function AboutMe() {
  return (
    <>
      <Header />
      <div id="container">
        <header>
          <span>Amar Jyoti</span>

          <Link id="lets-work" to="/">
            Sticky
          </Link>
          <Link id="lets-work" to="#">
            About Me
          </Link>
        </header>

        <aside id="left-sidebar">
          <p id="intro">
            Over 1 years of <span>experience</span>
          </p>
          <img src={profile} alt="Amar Jyoti" />
        </aside>

        <main>
          <h1>
            Amar <span>web developer</span>
          </h1>
          <article>
            <img
              id="featured-img"
              src="https://www.webskittersacademy.in/wp-content/uploads/2015/08/Web-Developer-skill.jpg"
              alt="Article's featured"
            />
            <p>
              Hello Everyone. My name is Amar Jyoti. It has been my pleasure to
              build this ECommerce Website. The purpose of building this website
              is to provide excellent stickers at the most affordable price.
              Ever since I was a child, I loved stickers. I used to collect it,
              paste it into a diary, and call it my "sticker diary.
            </p>

            <p>
              In my venture of collecting stickers, I felt many challenges
              because most of the stickers that I wanted to collect was
              unavailable. So that is why I started this website. To sort out
              this problem.
            </p>

            <p>
              Here, you can browse from our collection and find the one which
              you want. BUT if we do not have that in our collection then you
              can custom order it. We will make sure that you will receive it
              the next day.
            </p>
    <br />
            <h2>Features</h2>
            <ul>
              <li>Next Day Delivery</li>
              <li>Most Affordable Price</li>
              <li>Custom Order Facility</li>
              <li>High Quality Stickers</li>
              <li>7 Days Warrenty</li>
              <li>Returnable and Refundable</li>
            </ul> <br /> <br />
            <h1> <em><i>I HOPE YOU WILL LOVE IT</i></em></h1>
          </article>
        </main>
      </div>
    </>
  );
}

export default AboutMe;
