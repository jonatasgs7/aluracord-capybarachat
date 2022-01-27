function GlobalStyle() {
    return (
      <style global jsx>{`
        * {margin:0; padding:0; box-sizing: border-box; list-style:none;}
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');
        body {font-family:'Roboto', sans-serif;}
        html, body, #__next {min-height:100vh; display:flex; flex:1;}
        #__next {flex: 1;}
        #__next > * {flex: 1;}

        ::-webkit-scrollbar {width:7px;}
        ::-webkit-scrollbar-track {background:#212931;}
        ::-webkit-scrollbar-thumb {background:#f3f3f3;}

      `}</style>
    );
}

export default function CustomApp({ Component, pageProps }){
    return(
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}