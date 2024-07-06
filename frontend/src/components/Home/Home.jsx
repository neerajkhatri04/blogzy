import React, { useState } from "react";
import Features from "./Features";
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="overflow-hidden pb-24">
      <div className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
      </div>
      <div className="container px-4 mx-auto relative">
        <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
          <img
            className="object-cover w-full h-full scale-x-[-1]"
            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home-img"
          />
        </div>
        <div className="relative z-20 py-20 lg:ml-16">
          <h1 className=" text-5xl lg:text-7xl font-bold font-heading mb-6 max-w-2xl">
            <span className="text-zinc-800 opacity-95">
              Unlock the door to inspiration and knowledge
            </span>
            <div>
              <span className="text-red-600 opacity-70 hover:font-outline-2-red hover:text-transparent">
                with&nbsp;
              </span>
              <span className="text-red-600 opacity-70 hover:font-outline-2-red hover:text-transparent">
                every&nbsp;
              </span>
              <span className="text-red-600 opacity-70 hover:font-outline-2-red hover:text-transparent">
                click
              </span>
            </div>
          </h1>
          <p className=" text-lg mb-10 max-w-lg">
            Embark on a journey of discovery and growth. Connect, collaborate,
            and create with a global network of enthusiastic learners and
            thinkers.
          </p>
          <div className="flex">
            <Link
              to="/register"
              className="w-full sm:w-auto h-16 inline-flex items-center justify-center text-center py-4 px-6 bg-red-600 shadow font-bold font-heading text-white hover:bg-red-700 hover:border-b-2 focus:ring focus:ring-blue-200 transition duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {/* <FeaturedPost post={featuredPost} /> */}
      {/* Features */}
      <Features />
      {/* Call to action */}
      <CallToAction />
    </section>
  );
};

export default Home;
