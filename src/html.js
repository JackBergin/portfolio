import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

// Runs before first paint: adds a `js` class (so reveal animations only hide
// content when JS is available) and applies the saved/system theme so dark
// mode never flashes on load.
const themeInit = `(function(){try{var e=document.documentElement;e.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){e.classList.add('dark')}}catch(_){}})();`

function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#E25C33" />
        <link
          rel="icon"
          type="image/svg+xml"
          href={withPrefix("/favicon.svg")}
        />
        <link rel="apple-touch-icon" href={withPrefix("/favicon.svg")} />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700&family=Archivo+Black&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default HTML 