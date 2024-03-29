'use strict';
import React from 'react';
import Header1 from "../../components/Header"
import Head from "next/head";
import {isMobile,setCookie} from "../../components/other";
import CheckAuth from "../../components/checkAuth"
import fetch from "isomorphic-unfetch";

export default class Persik extends React.Component {

    constructor(props){
        super(props);

        this.state={
            error:"",
            loading:false,
            log:"",
            pass:"",
        }


    }
   componentDidMount() {


       document.body.style.overflow = 'hidden';
        window.onresize=()=>{
            if (isMobile()) {
                this.setState({mobile:true})
                setTimeout(()=>{
                    try{
                        var t =(window.outerWidth-document.getElementById("mb").offsetWidth)/2
                        this.setState({ot:t})
                    }catch (Exception){}

                },15)
            }else{
                this.setState({mobile:false})

            }
        }
       if (isMobile()) {
           this.setState({mobile:true})
           setTimeout(()=>{
               var t =(window.outerWidth-document.getElementById("mb").offsetWidth)/2
               this.setState({ot:t})

           },15)
       }
    }
    auth(){
        var log = document.getElementById("log").value
        var pass = document.getElementById("pass").value

        if((log || pass)==="" ){
            this.setState({error:"Неправильный логин или пароль"})
        }else{
            this.setState({loading:true})
            const data1 = new URLSearchParams();
            data1.append("login",log)
            data1.append("password",pass)

            fetch(process.env.REACT_APP_API+'/login',{method:"POST",body: data1})
                .then(response=>response.json())
                .then(data=>{
                    if("result" in data){
                        setCookie("token",data['result']['token'],{'max-age': 2592000})
                        setTimeout(()=>{
                            window.location='/admin'
                        },300)
                    }else{
                        this.setState({error:data['error']['text_ru']})
                        setTimeout(()=>{
                            this.setState({loading:false})
                        },300)
                    }
                })
        }
    }
    getHead(title,description){
        return(
            <Head>
                {title===""?(<title>News Site</title>):(<title>{title}</title>)}
                <meta name="description" content={description}/>
                {title===""?(<meta property="og:title" content="News Site"/>):(<meta property="og:title" content={title}/>)}
                <meta property="og:description" content={description}/>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html:`
                "@context": "https://schema.org",
  "@type": "Project",
  "name": "News Site",
  "alternateName": "News Site",
  "url": "https://finebot.site",
  "logo": "https://finebot.site/static/images/logo.png"`}}></script>
                <meta property="og:site_name" content="News Site"/>
                <meta property="og:image" content="https://finebot.site/static/images/logo.png"/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta name="twitter:image" content="https://finebot.site/static/images/logo.png"/>
                <meta property="vk:image" content="https://finebot.site/static/images/logo.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="https://finebot.site/static/images/logo.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="https://finebot.site/static/images/logo.png"/>
                <link rel="apple-touch-icon" href="https://finebot.site/static/images/logo.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="https://finebot.site/static/images/logo.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="https://finebot.site/static/images/logo.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="https://finebot.site/static/images/logo.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="https://finebot.site/static/images/logo.png"/>
                <link rel="mask-icon" href="https://finebot.site/static/images/logo.png" color="#FFF"/>
                <link rel="image_src" href="https://finebot.site/static/images/logo.png"/>
            </Head>
        )
    }



    render() {

        return (
            <CheckAuth>
                {this.getHead("Авторизация","News Site")}

                <Header1 shownavigate={false}/>
                {this.state.mobile?(<div style={{paddingTop:"45px",display:"block"}}>
                            <img className="login" style={{zIndex:1,objectFit:"cover",width:"100vw",overflow:"hidden",position:"absolute",height:"100vh",marginTop:"-50px"}} src="/static/images/1593740653_30-p-foni-v-stile-flat-41.jpg"/>
                            <div id="mb" style={{maxWidth:"450px",position:"absolute",zIndex:1,width:"90vw",height:"300px",background:"white",borderRadius:"10px",display:"block",right:this.state.ot,top:"30%"}}>
                                <h2 style={{textAlign:"center"}}>Авторизация</h2>
                                {this.state.loading?(
                                    <div className="loader">
                                        <div className="inner one"></div>
                                        <div className="inner two"></div>
                                        <div className="inner three"></div>
                                    </div>
                                ):(<div>
                                    <div style={{marginLeft:"65px",width:"200px",marginTop:"40px"}}>
                                        <input value={this.state.log} onChange={()=>{
                                            var log = document.getElementById("log").value
                                            this.setState({log:log})
                                        }} id={"log"} placeholder={"Логин"} style={{width:"200px",marginBottom:"15px"}}/>
                                        <input type={"password"} value={this.state.pass} onChange={()=>{
                                            var pass = document.getElementById("pass").value
                                            this.setState({pass:pass})
                                        }} id={"pass"} placeholder={"Пароль"} style={{width:"200px"}}/>
                                    </div>
                                    <div style={{width:"100%",textAlign:"center"}}>
                                        <div onClick={()=>this.auth()} style={{width:"80px",marginTop:"30px"}} className={"button2"}>Войти</div>
                                        <div style={{color:"red",fontSize:"13px",marginTop:"20px"}}>{this.state.error}</div>
                                    </div>
                                </div>)}

                            </div>
                        </div>
                    ):
                    (
                        <div style={{paddingTop:"45px",display:"block"}}>
                            <img className="login" style={{objectFit:"cover",width:"100vw",overflow:"hidden",position:"absolute",height:"100vh",marginTop:"-50px"}} src="/static/images/1593740653_30-p-foni-v-stile-flat-41.jpg"/>
                            <div style={{width:"350px",height:"300px",background:"white",position:"absolute",borderRadius:"10px",display:"block",
                                right:"10vw",top:"30%"}}>
                                <h2 style={{textAlign:"center"}}>Авторизация</h2>
                                {this.state.loading?(
                                    <div className="loader">
                                        <div className="inner one"></div>
                                        <div className="inner two"></div>
                                        <div className="inner three"></div>
                                    </div>
                                ):(<div>
                                    <div style={{marginLeft:"65px",width:"200px",marginTop:"40px"}}>
                                        <input value={this.state.log} onChange={()=>{
                                            var log = document.getElementById("log").value
                                            this.setState({log:log})
                                        }} id={"log"} placeholder={"Логин"} style={{width:"200px",marginBottom:"15px"}}/>
                                        <input type={"password"} value={this.state.pass} onChange={()=>{
                                            var pass = document.getElementById("pass").value
                                            this.setState({pass:pass})
                                        }} id={"pass"} placeholder={"Пароль"} style={{width:"200px"}}/>
                                    </div>
                                    <div style={{width:"100%",textAlign:"center"}}>
                                        <div onClick={()=>this.auth()} style={{width:"80px",marginTop:"30px"}} className={"button2"}>Войти</div>
                                        <div style={{color:"red",fontSize:"13px",marginTop:"20px"}}>{this.state.error}</div>
                                    </div>
                                </div>)}


                            </div>
                        </div>
                    )}
            </CheckAuth>
        );
    }
}



