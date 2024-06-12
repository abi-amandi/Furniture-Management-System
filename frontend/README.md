# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)








import PropTypes from 'prop-types';
import React from 'react';


const ServiceSection = ({ title, description, imageUrl, imageAlt, isEven}) => (

  <div className={"w-[1340px] overflow-hidden flex flex-col items-start justify-start py-[60px] px-28 box-border"} style={{ backgroundColor: isEven ? 'white' : '#FFF6F3' }}>
    <div className="flex flex-row items-center justify-start gap-[115px]" style={{ flexDirection: isEven ? 'row-reverse' : 'flex-row'}}>

      {/* IMAGE CONTAINER */}
      <img
        className="w-[454px] relative rounded-xl h-[396px] object-cover"
        alt={imageAlt}
        src={imageUrl}
      />

     {/*  DETAILS CONTAINER */}
      <div className="flex flex-col items-start justify-start gap-[48px]">
        <b className="relative">{title}</b>
        <div className="w-[546px] relative text-5xl inline-block">
          {description}
        </div>
      </div>

    </div>
  </div> 


);

// check it --------------------IF NEED ---------------------
ServiceSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  isEven: PropTypes.bool.isRequired
};
// check it -----------------------------------------

const Services = () => {
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-center justify-start py-[55px] px-0 box-border text-left text-[48px] text-black font-poppins">
      <div className="flex flex-col items-center justify-start gap-[0px]">

        {/* HEADING SECTION */}
        <section className="w-[1261px] h-60 flex flex-col items-start justify-start gap-[24px]">
          <b className="relative">
            <p className="m-0">Our signature services tailored for you</p>
          </b>
          <div className="relative text-5xl">
            <p className="m-0">
              DGateway In technical team will design and develop the best solution for your business. We will ensure quality and technical support for your software.
            </p>
          </div>
        </section>

        {/* ALL SERVICES SECTION */}
        <section className="flex flex-col items-start justify-start text-13xl">
          <ServiceSection
            title="Web Development"
            description="Translate your concepts onto the screen. We design intuitive interfaces that captivate interest, coupled with algorithms geared towards motivation, ensuring sustained engagement."
            imageUrl="/WhatWeOfferImg/WEB.png"
            imageAlt="Web Development"
            isEven={false} // First section, #FFF6F3 background
          />
          <ServiceSection
            title="Mobile Application Development"
            description="Crafting a seamless style, we transform and distill your concepts into applications poised for widespread accessibility. We imbue both functionality and your app's inherent values, ensuring it resonates with a diverse audience."
            imageUrl="/WhatWeOfferImg/MOBILE.png"
            imageAlt="Mobile Application Development"
            isEven={true} // Secound section, white background
          />
          <ServiceSection
            title="UI / UX"
            description="Emphasize the presentation and behavior, mirroring the nuances of human personality. Construct your website with an elevated personality to capture attention and enhance performance. Personality is a crucial factor."
            imageUrl="/WhatWeOfferImg/UI.png"
            imageAlt="UI / UX"
            isEven={false} // thired section, #FFF6F3 background
          />
          <ServiceSection
            title="Business Consultation"
            description="Boost your business with our personalized consultation services. We analyze your needs and turbocharge growth in a straightforward way. We don't just aim for goals; we make the entire journey memorable, building a brand that stands out. Partner with us for a strategic approach that simplifies your business path, making every step purposeful and impactful."
            imageUrl="/WhatWeOfferImg/BC.png"
            imageAlt="Business Consultation"
            isEven={true} // Fourth section, white background
          />
          <ServiceSection
            title="Artificial Intelligence"
            description="Tap into the potential of our user-friendly AI services. Whether you're developing smart applications or gaining valuable insights from data, our advanced language model simplifies the process. Experience enhanced efficiency and innovation as we bring a touch of the future to your projects. Embrace the ease of cutting-edge technology with our AI services."
            imageUrl="/WhatWeOfferImg/AI.png"
            imageAlt="Artificial Intelligence"
            isEven={false} // Fith section, #FFF6F3 background
          />
          <ServiceSection
            title="Digital Marketing"
            description="Establish your brand identity with us. We meticulously analyze and propel your business through distinctive and comprehensive strategies. Our focus is not just on reaching the destination but on ensuring the journey is memorable. Come and experience it with us."
            imageUrl="/WhatWeOfferImg/DM.png"
            imageAlt="Digital Marketing"
            isEven={true} // Sixth section, white background
          />
        </section>

      </div>
    </div>
  )
}
export default Services;






