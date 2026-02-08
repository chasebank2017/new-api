/**
 * OpenClaw 品牌 logo（与官网 openclawapi.ai CrabLogo 一致）
 */
import React from 'react';

export default function CrabLogo({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox='0 0 32 32' fill='none' className={className}>
      <path
        d='M8 12C6 10 5 7 6.5 5C7.5 3.5 9.5 3.5 10.5 5C11.2 6 11 8 10 10'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M6.5 5C5.5 4 4 4.5 4 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
      <path
        d='M24 12C26 10 27 7 25.5 5C24.5 3.5 22.5 3.5 21.5 5C20.8 6 21 8 22 10'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M25.5 5C26.5 4 28 4.5 28 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
      <ellipse
        cx='16'
        cy='18'
        rx='8'
        ry='6.5'
        fill='currentColor'
        fillOpacity='0.15'
        stroke='currentColor'
        strokeWidth='1.8'
      />
      <circle cx='13' cy='15.5' r='1.5' fill='currentColor' />
      <circle cx='19' cy='15.5' r='1.5' fill='currentColor' />
      <path
        d='M13.5 20C14.5 21 17.5 21 18.5 20'
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path d='M9 22L5.5 26' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M11 23.5L9 27.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M23 22L26.5 26' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      <path d='M21 23.5L23 27.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    </svg>
  );
}
