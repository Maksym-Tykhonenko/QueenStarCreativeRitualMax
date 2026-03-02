import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const Quinloadin = () => {
  const dimensions = Dimensions.get('window');

  const loaderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* From Uiverse.io by dovatgabriel */ 
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: transparent;
        }
        .three-body {
          --uib-size: 35px;
          --uib-speed: 0.8s;
          --uib-color: #FFF11C;
          position: relative;
          display: inline-block;
          height: var(--uib-size);
          width: var(--uib-size);
          animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
        }
        .three-body__dot {
          position: absolute;
          height: 100%;
          width: 30%;
        }
        .three-body__dot:after {
          content: '';
          position: absolute;
          height: 0%;
          width: 100%;
          padding-bottom: 100%;
          background-color: var(--uib-color);
          border-radius: 50%;
        }
        .three-body__dot:nth-child(1) {
          bottom: 5%;
          left: 0;
          transform: rotate(60deg);
          transform-origin: 50% 85%;
        }
        .three-body__dot:nth-child(1)::after {
          bottom: 0;
          left: 0;
          animation: wobble1 var(--uib-speed) infinite ease-in-out;
          animation-delay: calc(var(--uib-speed) * -0.3);
        }
        .three-body__dot:nth-child(2) {
          bottom: 5%;
          right: 0;
          transform: rotate(-60deg);
          transform-origin: 50% 85%;
        }
        .three-body__dot:nth-child(2)::after {
          bottom: 0;
          left: 0;
          animation: wobble1 var(--uib-speed) infinite
            calc(var(--uib-speed) * -0.15) ease-in-out;
        }
        .three-body__dot:nth-child(3) {
          bottom: -5%;
          left: 0;
          transform: translateX(116.666%);
        }
        .three-body__dot:nth-child(3)::after {
          top: 0;
          left: 0;
          animation: wobble2 var(--uib-speed) infinite ease-in-out;
        }
        @keyframes spin78236 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes wobble1 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-66%) scale(0.65);
            opacity: 0.8;
          }
        }
        @keyframes wobble2 {
          0%,
          100% {
            transform: translateY(0%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(66%) scale(0.65);
            opacity: 0.8;
          }
        }
      </style>
    </head>
    <body>
      <!-- From Uiverse.io by dovatgabriel --> 
      <div class="three-body">
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
        <div class="three-body__dot"></div>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={{
      height: dimensions.height * 0.55,
      alignSelf: 'center',
      flex: 0,
      width: dimensions.width * 0.9,
    }}>
      <WebView
        allowsInlineMediaPlayback={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        source={{ html: loaderHTML }}
        mixedContentMode="compatibility"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        scalesPageToFit={false}
      />
    </View>
  );
};

export default Quinloadin;