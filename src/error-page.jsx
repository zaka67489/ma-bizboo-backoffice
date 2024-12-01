import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta id="viewport" name="viewport" content="" />
  <link rel="icon" type="image/png" href="/favicon-usun.png" />
  <title>USUN CASH</title>
  <meta name="description" content="USUN CASH ระบบ ฝาก/ถอน อัตโนมัติ" />
  <meta property="og:title" content="USUN CASH" />
  <meta property="og:description" content="USUN CASH ระบบ ฝาก/ถอน อัตโนมัติ" />
  <meta property="og:image" content="/favicon-usun.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="USUN CASH" />
  <meta name="twitter:description" content="USUN CASH ระบบ ฝาก/ถอน อัตโนมัติ" />
  <meta name="twitter:image" content="/favicon-usun.png" />
  <link href="/css/chunk-vendors.dc1f6769.css" rel="stylesheet" />
  <link href="/css/app.57326835.css" rel="stylesheet" />
  <meta name="head:count" content={0} />
  <style
    type="text/css"
    dangerouslySetInnerHTML={{
      __html:
        "/* Chart.js */\n/*\n * DOM element rendering detection\n * https://davidwalsh.name/detect-node-insertion\n */\n@keyframes chartjs-render-animation {\n\tfrom { opacity: 0.99; }\n\tto { opacity: 1; }\n}\n\n.chartjs-render-monitor {\n\tanimation: chartjs-render-animation 0.001s;\n}\n\n/*\n * DOM element resizing detection\n * https://github.com/marcj/css-element-queries\n */\n.chartjs-size-monitor,\n.chartjs-size-monitor-expand,\n.chartjs-size-monitor-shrink {\n\tposition: absolute;\n\tdirection: ltr;\n\tleft: 0;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\toverflow: hidden;\n\tpointer-events: none;\n\tvisibility: hidden;\n\tz-index: -1;\n}\n\n.chartjs-size-monitor-expand > div {\n\tposition: absolute;\n\twidth: 1000000px;\n\theight: 1000000px;\n\tleft: 0;\n\ttop: 0;\n}\n\n.chartjs-size-monitor-shrink > div {\n\tposition: absolute;\n\twidth: 200%;\n\theight: 200%;\n\tleft: 0;\n\ttop: 0;\n}\n"
    }}
  />
  <noscript>
    &lt;strong&gt;We're sorry but app doesn't work properly without JavaScript
    enabled. Please enable it to continue.&lt;/strong&gt;
  </noscript>
  <div id="app" data-v-app="">
    
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen text-center lg:flex-row lg:text-left">
        <div className="-intro-x lg:mr-20">
          <a href="/" className="">
            <img alt="logo" className="w-60" src="/img/logo.png" />
          </a>
        </div>
        <div className="mt-10 text-white lg:mt-0">
          <div className="font-medium intro-x text-8xl">404</div>
          <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
            {" "}
            Oops. This page has gone missing.{" "}
          </div>
          <div className="mt-3 text-lg intro-x">
            {" "}
            You may have mistyped the address or the page may have moved.{" "}
          </div>
          <a href="/" className="btn outline-primary mt-6">
            Back to Home
          </a>
        </div>
      </div>
    </div>
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black/50 backdrop-blur z-[100] flex justify-center"
      style={{ display: "none" }}
    >
      <div>
        <h3 className="text-white font-display text-3xl font-medium mt-16">
          โปรดรอสักครู่ กำลังอัพเดท... 5
        </h3>
      </div>
    </div>
  </div>
  
  
  
  
  
  
  
</>

  );
}