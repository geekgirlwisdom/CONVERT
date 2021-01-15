import React, {Component, useEffect} from 'react';
import ReactDOM, {render} from 'react-dom';
import './css/convert.css'; 
import  HandleErrors from './HandleErrors';
 
class ConvertForm extends  Component 
{ 
	//Declare Variables
	state = {fromAmount : 0, toAmount : 0, fromCurrency: "", toCurrency: "" , value: "", loading: false, exchangeData: [] , results: "" }
	static defaultProps  = { 
		options: []
	} 
 
	//Declare internal methods/functions
	convertValue = () => { 
		var fromCurrency = this.state.exchangeData.rates[this.state.fromCurrency]
		var fromAmount = this.state.fromAmount 
		var toCurrency = this.state.exchangeData.rates[this.state.toCurrency]
		var ratio =  fromCurrency/toCurrency
		var result = 0
	     
		if (toCurrency >  fromCurrency)
			result =  fromAmount/ratio 
		else
			result =  fromAmount * ratio 
		
		this.setState({ toAmount: result, results: `${this.state.fromAmount}  ${this.state.fromCurrency }= ${result} ${this.state.toCurrency} `   }) 
	}
 
	componentDidMount() { 
		this.setState({   loading: true})   
 		this.getValues();
  	}
 
	getValues = () => {
		try
		{
			if (this.props.options.length < 1 || this.props.options == undefined )
			{  
				fetch('https://api.exchangeratesapi.io/latest')
				.then(exchangeData => exchangeData.json())
				.then(exchangeData => this.setState({ exchangeData, loading: false})   )
				.then(exchangeData => {this.props.options.length = 0; for (const key in this.state.exchangeData.rates) { this.props.options.push(key);   } } )  ;
			}
		}
		catch(err)
		{
			HandleErrors(err)
		}
	}
	
	handleChange  =  e  =>  {	
		this.setState({ [e.target.name]: e.target.value, value: e.target.value })
	} 
 
	submit = e => {
		try{
			this.convertValue()
			e.preventDefault()
		}
		catch(err)
		{
			HandleErrors(err)
		}
	}
			
		render()  {
			
			return  (
				<div className="convertContainer"> 
					
					<h1>Convert Values</h1>
					<button className="btn btn-default btn-info" onClick={this.getValues()}>Get the Latest Exchange Values</button>
					<br />
					
					<label name="result"  >{this.state.results}</label>
					
					<form onSubmit={this.submit}>
						{/* FROM */}
						<div className="form-group">					
							<select name='fromCurrency' className="dropDown" onChange={ this.handleChange } > <option value="">From Currency</option>
								if (this.state.loading)  { this.props.options.map(  (optionValue  => (<option >{optionValue}</option> )) ) 	}
							</select>						
						<input name='fromAmount'  className="input-lg input-group form-control" onChange = {this.handleChange} />

						</div> 
					
						{/* TO */}
						<div  className="form-group">
					  	<select name='toCurrency' className="dropDown"  onChange={ this.handleChange } >   
							<option value="">To Currency</option>
								if (this.state.loading)  { this.props.options.map(  (optionValue  => (<option >{optionValue}</option> )) ) 	}
						</select>
						<input name='toAmount' className="input-lg input-group form-control"disabled value={this.state.toAmount} onChange = {this.handleChange} />

					</div>
					
					<button className="btn btn-default btn-primary btn-lg">Submit</button>
				</form> 
				</div>
			)
		}
} 
 

export default ConvertForm 