'use client'

import gsap from "gsap"
import { SplitText } from 'gsap-trial/SplitText';
import React, { useRef, useEffect } from 'react';

gsap.registerPlugin(SplitText);

const TextSwitcher = () => {

  const technoWordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if technoWordsRef.current is not null before proceeding
    if (technoWordsRef.current) {
      const titles = gsap.utils.toArray(technoWordsRef.current.children);
      const tl = gsap.timeline();
  
      titles.forEach((title) => {
        const splitTitle = new SplitText(title as HTMLElement, { type: 'chars' });
        tl.from(splitTitle.chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.02
        }, "<")
        .to(splitTitle.chars, {
            opacity: 0,
            y: -80,
            rotateX: 90,
            stagger: 0.02
          }, "<1");
      });
    }
  }, []);

  

  return (
    <div className="container-techno-word" ref={technoWordsRef}>
      <div className="text-techno-wrapper">
        <p>Techno</p>
        <p>Hard Techno</p>
        <p>Dark Techno</p>
        <p>Underground</p>
      </div>
    </div>
  )
}

export default TextSwitcher