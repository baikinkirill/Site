import React from 'react';
import Icon28User from '@vkontakte/icons/dist/28/user_outline';



class Persikf extends React.Component {

	constructor() {
		super(props);
		this.state={
			active:["","",""]
		}
	}


	componentDidMount() {
			var t = this.state.active
			t[this.props.active]="#2b13f0"
			this.setState({active:t})
	}


	render() {
		var theme="hdblock"
		if(!this.props.indent && this.props.indent!=undefined){
			theme="hdblock1"
		}
		return (
			<div>
				<div className="parent">
					<div className={theme} >
						<table style={{height:"50px"}} width="100%">
							<tr valign="center">
								<td width={"35px"} align={"left"}>
									<div >
										<a id="events" href="/"><img src="/static/images/logo.png"  style={{height:"35px",width:"35px",marginLeft:"10px",paddingRight:"10px"}}
										/></a>
									</div>
								</td>
								<td align={"left"}>
									<div style={{display:"flex"}}>
										<a target={"_blank"} href={"/tags/main"} className={"tabs"}>
											Главное
										</a>
										<div style={{backgroundColor:"#dbdbdb",width:"1px",marginLeft:"5px",marginRight:"5px"}}></div>
										<a target={"_blank"} href={"/tags/Животные"} className={"tabs"}>
											Животные
										</a>
										<div style={{backgroundColor:"#dbdbdb",width:"1px",marginLeft:"5px",marginRight:"5px"}}></div>
										<a target={"_blank"} href={"/tags/Политика"} className={"tabs"}>
											Политика
										</a>
									</div>
								</td>
								<td align="right"><div>
									<a style={{width:"35px",display:"flex",cursor:"pointer",textDecoration:"none", paddingRight:"10px"}} href="/login">
										<Icon28User className={"iconColor"}/>
									</a>
								</div></td>
							</tr>
						</table>
					</div>
					<div style={{backgroundColor:"#dbdbdb",height:"1px",paddingRight:"40px",paddingLeft:"40px"}}></div>

				</div>
				<div style={{height:"0x",padding:"25px"}}/>
			</div>
		);
	}
}
export default Persikf