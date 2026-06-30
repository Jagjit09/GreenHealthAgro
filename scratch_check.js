const https = require('https');

https.get('https://jagjit-portfolio-delta.vercel.app/assets/index-B48LNXUR.js', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log("react-three/fiber:", data.includes('react-three/fiber'));
    console.log("react-three/drei:", data.includes('react-three/drei'));
    console.log("framer-motion:", data.includes('framer-motion'));
    console.log("react-tilt:", data.includes('react-tilt') || data.includes('Tilt'));
    console.log("three.js:", data.includes('three.js') || data.includes('THREE'));
    console.log("gsap:", data.includes('gsap'));
  });
}).on('error', (err) => {
  console.log("Error:", err.message);
});
