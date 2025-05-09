import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollVideoGrowProps {
  title: string;
  videoSrc?: string;
  placeholderSrc?: string;
  description?: string;
  className?: string;
}

const ScrollVideoGrow: React.FC<ScrollVideoGrowProps> = ({
  title,
  videoSrc,
  placeholderSrc = 'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg',
  description = 'Start animations when elements enter the viewport, scrub through timelines, pin elements in place, or snap to key points as users scroll.',
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !videoRef.current || !imgRef.current) return;

    // Split the title into characters for animation
    const splitTitle = () => {
      const text = titleRef.current;
      if (!text) return [];
      
      text.setAttribute("aria-label", text.textContent || '');
      const splits = new SplitText(text, { type: "chars" });
      splits.chars.forEach((char: HTMLElement) => char.setAttribute("aria-hidden", "true"));
      return splits.chars;
    };

    const titleChars = splitTitle();
    const video = videoRef.current;
    const img = imgRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom bottom+=100%",
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    // Title animation
    tl.fromTo(
      titleChars,
      {
        scale: 0,
        rotation: (i: number) => Math.random() * 360 - 180,
      },
      {
        scale: 1,
        duration: 0.2,
        rotation: 0,
        ease: "expo.out",
        stagger: {
          each: 0.05,
          from: "random",
        },
      }
    );

    // Video container animation
    tl.fromTo(
      video,
      {
        clipPath: "inset(10% 50% 10% 50%)",
        yPercent: 100,
      },
      {
        ease: "power3",
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        yPercent: 0,
      },
      ".3"
    );

    // Scale up animation
    tl.fromTo(
      video,
      {
        scale: 0.5,
      },
      {
        ease: "back.inOut(.2)",
        scale: 1,
        duration: 0.8,
      },
      "<"
    );

    // Image animation
    tl.fromTo(
      img,
      {
        scale: 2.8,
        yPercent: 40,
      },
      {
        scale: 1.2,
        duration: 0.8,
        delay: 0.2,
        yPercent: 0,
      },
      "<"
    );

    // Final adjustments
    tl.to(video, {
      scale: 0.9,
      ease: "linear",
    });

    tl.to(
      img,
      {
        scale: 1,
        ease: "linear",
      },
      "<"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [title]);

  return (
    <section 
      ref={sectionRef}
      className={`scrolltrigger-section ${className}`}
      data-animate="videogrow"
    >
      <div className="sticky-wrapper">
        <div className="content-container">
          <div 
            ref={titleRef}
            className="title-text"
            data-videogrow="title"
          >
            {title}
          </div>
          
          <div className="video-layer">
            <div 
              ref={videoRef}
              className="video-container"
              data-videogrow="video"
            >
              <img
                ref={imgRef}
                src={videoSrc || placeholderSrc}
                alt=""
                className="video-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="explainer-container">
        <div className="explainer-content">
          <div className="explainer-toggle">
            <input type="checkbox" id="explainer-toggle" className="explainer-input" />
            <label htmlFor="explainer-toggle" className="explainer-label">
              <span className="explainer-title">Scroll with purpose</span>
              <div className="plus-icon">
                <div className="plus-line vertical"></div>
                <div className="plus-line horizontal"></div>
              </div>
            </label>
          </div>
          
          <div className="explainer-expandable">
            <div className="explainer-text">
              <p>{description}</p>
            </div>
            
            <button className="copy-button">
              <span>Copy this</span>
              <svg className="copy-icon" viewBox="0 0 9 11" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 1.5H1V6.5H5V1.5ZM0 0.5V7.5H6V0.5H0Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M3 8.757V10.5H9V3.5H7.42V4.5H8V9.5H4V8.757H3Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrolltrigger-section {
          position: relative;
          height: 400svh;
          padding-top: 0;
          padding-bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        
        .sticky-wrapper {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100svh;
          padding-top: 6rem;
          padding-bottom: 6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .content-container {
          position: relative;
          width: 94%;
          max-width: 1620px;
          min-width: 20vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }
        
        .title-text {
          margin: 0;
          font-family: Anton, sans-serif;
          font-weight: 400;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          font-size: 17vw;
          line-height: 1em;
          overflow: hidden;
        }
        
        .video-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }
        
        .video-container {
          overflow: hidden;
          width: 70%;
          height: 29rem;
          max-width: 1620px;
          border-radius: 0.375rem;
          pointer-events: auto;
          clip-path: inset(10% 50% 10% 50%);
          transform: translateY(100%) scale(0.5);
        }
        
        .video-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(2.8) translateY(40%);
        }
        
        .explainer-container {
          position: relative;
          z-index: 5;
          width: 94%;
          height: 10rem;
          margin-top: 3rem;
          margin-bottom: 3rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          pointer-events: auto;
        }
        
        .explainer-content {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          padding: 0 0.75rem 0.75rem;
          flex-direction: column;
          border-radius: 0.375rem;
          background-color: hsl(32.3, 86.7%, 97.1%);
        }
        
        .explainer-toggle {
          position: relative;
          margin-bottom: 0;
          padding: 0.4rem 0 0.75rem;
          cursor: pointer;
        }
        
        .explainer-input {
          position: absolute;
          opacity: 0;
        }
        
        .explainer-label {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .explainer-title {
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .plus-icon {
          position: relative;
          width: 1em;
          aspect-ratio: 1/1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          outline: 1px solid #270f03;
        }
        
        .plus-line {
          position: absolute;
          background-color: #270f03;
        }
        
        .plus-line.vertical {
          width: 1px;
          height: 50%;
        }
        
        .plus-line.horizontal {
          width: 50%;
          height: 1px;
        }
        
        .explainer-expandable {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .explainer-text {
          overflow: hidden;
          width: 100%;
        }
        
        .explainer-text p {
          max-width: 25ch;
          margin-bottom: 0;
          padding: 0.4rem 0;
        }
        
        .copy-button {
          display: flex;
          width: 100%;
          padding: 0.375rem 0.625rem;
          justify-content: center;
          align-items: center;
          border-radius: 0.375rem;
          outline: 1px solid rgba(20, 27, 19, 0.2);
          transition: background-color 200ms ease;
          cursor: pointer;
        }
        
        .copy-button:hover {
          background-color: #69e05f;
        }
        
        .copy-icon {
          width: 1rem;
          height: 1rem;
        }
        
        @media (max-width: 767px) {
          .sticky-wrapper {
            height: 80svh;
          }
          
          .video-container {
            height: 15rem;
          }
          
          .explainer-container {
            width: 80%;
            height: auto;
            filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.1));
          }
          
          .plus-icon {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ScrollVideoGrow;
