"use client";

import AnimatedTitle from "./AnimatedTitle";

const ZentryContact = () => {
  return (
    <section id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-[#dfdff2] sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact-1.webp"
            alt="contact"
            className="size-full object-cover object-center"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact-2.webp"
            alt="contact"
            className="size-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Nexorith
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> future t<b>o</b>gether"
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <a
            href="/contact"
            className="group mt-10 flex items-center gap-1 rounded-full bg-yellow-300 px-7 py-3 text-black transition-all duration-300 hover:bg-yellow-400"
          >
            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
              <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                Start Your Project
              </div>
              <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                Start Your Project
              </div>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ZentryContact;
