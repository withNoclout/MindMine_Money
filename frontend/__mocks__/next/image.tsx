import React from 'react';

// Mock Next.js Image component
const Image = (props: any) => {
    const { src, alt, width, height, className } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
};

export default Image;
