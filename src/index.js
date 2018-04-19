import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
var Request = require('request');
var QS = require('querystring');

function Instrument(props) {
	return (
		<div style={{
			position: 'absolute',
			bottom: props.bottom + 'px',
			left: props.left + 'px',
			height: '20px',
			width: '20px',
			zIndex: '100',
		}}><img src={'/static/instrument_' + props.color + props.instrument + '.png'} height='20' width='20' alt={props.instrument} /></div>
	);
}
class Card extends React.Component {
	render() {
		const cardData = this.props.cardData;
		const output = cardData.map((card, i) => {
			let cardColor = "";
			let instrument1 = "";
			let instrument2 = "";
			let instrument3 = "";
			let instrument4 = "";
			if (card.isMulti) {
				cardColor = 'wild';
				instrument1 = <Instrument bottom='15' left='15' color='yellow' instrument={card.yellowInstrument} />
				instrument2 = <Instrument bottom='15' left='35' color='red' instrument={card.redInstrument} />
				instrument3 = <Instrument bottom='15' left='55' color='blue' instrument={card.blueInstrument} />
				instrument4 = <Instrument bottom='15' left='75' color='green' instrument={card.greenInstrument} />
			}
			else if (card.isWhite) {
				cardColor = 'white';
				instrument1 = <div style={{
					position: 'absolute',
					bottom: '15px',
					left: '15px',
					height: '20px',
					width: '130px',
					zIndex: '100',
					fontSize: '8px',
					fontFamily: 'song',
					color: 'white',
				}}>{card.FXRuleText}</div>;
			}
			else {
				if (card.isYellow) {
					cardColor = 'yellow';
				}
				else if (card.isRed) {
					cardColor = 'red';
				}
				else if (card.isBlue) {
					cardColor = 'blue';
				}
				else if (card.isGreen) {
					cardColor = 'green';
				}
				instrument1 = <Instrument bottom='15' left='15' color={cardColor} instrument={card[cardColor + 'Instrument']} />
			}
			const altText = card.artist + "-" + card.song + " (" + card.playlist + " " + card.id + ")";
			const src = "https://sad.hasbro.com/dmx/art/" + card.artHash + ".jpg";
			if (this.props.query.artonly) {
				return <img src={src} height='150' width='150' alt={altText} />;
			}
			else {
				return (
					<div key={card.id} style={{
						position: 'relative',
						height: '260px',
						width: '187px',
						borderRadius: '10px',
						'float': 'left',
					}}>
						<div style={{
							position: 'absolute',
							top: '13px',
							left: '12px',
							height: '175px',
							width: '165px',
							zIndex: '50',
						}}><img src={src} height='175' width='165' alt={altText} /></div>
						<div style={{
							position: 'absolute',
							top: '0px',
							left: '0px',
							height: '260px',
							width: '187px',
							backgroundImage: 'url("./static/bg_' + cardColor + card.level + '.png")',
							backgroundSize: 'contain',
							zIndex: '51',
						}} />
						<div style={{
							position: 'absolute',
							bottom: '15px',
							right: '15px',
							height: '20px',
							width: '20px',
							zIndex: '100',
						}}><img src={'/static/logo_' + card.playlist + '.png'} height='20' width='20' alt={card.playlist} /></div>
						<div style={{
							fontFamily: 'artist',
							letterSpacing: '0.08em',
							position: 'absolute',
							top: '190px',
							left: '15px',
							zIndex: '100',
							color: 'white',
							fontSize: '7pt',
							textTransform: 'uppercase',
						}}>{card.artist}</div>
						<div style={{
							fontFamily: 'song',
							letterSpacing: '0.1em',
							position: 'absolute',
							top: '201px',
							left: '15px',
							zIndex: '100',
							color: 'white',
							fontSize: '7pt',
							textTransform: 'uppercase',
						}}>{card.song}</div>
						<div style={{
							fontFamily: 'song',
							position: 'absolute',
							bottom: '5px',
							right: '15px',
							zIndex: '100',
							color: 'white',
							fontSize: '7pt',
						}}>{card.id}</div>
						{instrument1}{instrument2}{instrument3}{instrument4}
					</div>
				);
			}
		});
		return output;
	}
}

class UI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artonly: props.query.artonly,
			connective: props.query.connective,
			playlist: props.query.playlist,
			level: props.query.level,
			color: props.query.color,
			yellowInstrument: props.query.yellowInstrument,
			redInstrument: props.query.redInstrument,
			blueInstrument: props.query.blueInstrument,
			greenInstrument: props.query.greenInstrument,
		};
	}

	getFields() {
		const fields = {
			playlist: {
				heading: 'Playlist',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Sweets', value: 'Sweets' },
							{ label: 'Highness', value: 'Highness' },
							{ label: 'Blade', value: 'Blade' },
							{ label: 'Controller', value: 'Controller' },
							{ label: 'Derby', value: 'Derby' },
							{ label: 'Mirrors', value: 'Mirrors' },
							{ label: 'Ouroboros', value: 'Ouroboros' },
							{ label: 'Astro', value: 'Astro' },
							{ label: 'Lucky', value: 'Lucky' },
							{ label: 'Flawless', value: 'Flawless' },
							{ label: 'Bomb', value: 'Bomb' },
							{ label: 'Chiller', value: 'Chiller' },
							{ label: 'Dapper', value: 'Dapper' },
							{ label: 'Seer', value: 'Seer' },
							{ label: 'Hightower', value: 'Hightower' },
							{ label: 'Puff', value: 'Puff' },
							{ label: 'Fever', value: 'Fever' },
							{ label: 'Breaker', value: 'Breaker' },
							{ label: 'Socket', value: 'Socket' },
							{ label: 'Moonlight', value: 'Moonlight' },
							{ label: 'Baffler', value: 'Baffler' },
							{ label: 'DM(Promo)', value: 'DM' },
						],
					},
				],
			},
			level: {
				heading: 'Level',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: '1', value: 1 },
							{ label: '2', value: 2 },
							{ label: '3', value: 3 },
						],
					},
				],
			},
			color: {
				heading: 'Color',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Yellow', value: 'isYellow' },
							{ label: 'Red', value: 'isRed' },
							{ label: 'Blue', value: 'isBlue' },
							{ label: 'Green', value: 'isGreen' },
							{ label: 'Wild', value: 'isMulti' },
							{ label: 'White/FX', value: 'isFX' },
						],
					},
				],
			},
			yellowInstrument: {
				heading: 'Instrument',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Yellow Drums', value: 'Drums' },
							{ label: 'Yellow Guitar', value: 'Guitar' },
							{ label: 'Yellow Horns', value: 'Horns' },
							{ label: 'Yellow Keys', value: 'Keys' },
							{ label: 'Yellow Sampler', value: 'Sampler' },
							{ label: 'Yellow Strings', value: 'Strings' },
							{ label: 'Yellow Vocals', value: 'Vocals' },
						],
					},
				],
			},
			redInstrument: {
				heading: 'Instrument',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Red Drums', value: 'Drums' },
							{ label: 'Red Guitar', value: 'Guitar' },
							{ label: 'Red Horns', value: 'Horns' },
							{ label: 'Red Keys', value: 'Keys' },
							{ label: 'Red Sampler', value: 'Sampler' },
							{ label: 'Red Strings', value: 'Strings' },
							{ label: 'Red Vocals', value: 'Vocals' },
						],
					},
				],
			},
			blueInstrument: {
				heading: 'Instrument',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Blue Drums', value: 'Drums' },
							{ label: 'Blue Guitar', value: 'Guitar' },
							{ label: 'Blue Horns', value: 'Horns' },
							{ label: 'Blue Keys', value: 'Keys' },
							{ label: 'Blue Sampler', value: 'Sampler' },
							{ label: 'Blue Strings', value: 'Strings' },
							{ label: 'Blue Vocals', value: 'Vocals' },
						],
					},
				],
			},
			greenInstrument: {
				heading: 'Instrument',
				sections: [
					{
						options: [
							{ label: '', value: '' },
							{ label: 'Green Drums', value: 'Drums' },
							{ label: 'Green Guitar', value: 'Guitar' },
							{ label: 'Green Horns', value: 'Horns' },
							{ label: 'Green Keys', value: 'Keys' },
							{ label: 'Green Sampler', value: 'Sampler' },
							{ label: 'Green Strings', value: 'Strings' },
							{ label: 'Green Vocals', value: 'Vocals' },
						],
					},
				],
			},
		};
		return fields;
	}

	handleOnChangeMulti = (event) => {
		const options = event.target.options;
		let values = [];
		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				values.push(options[i].value);
			}
		}
		let stateChange = {};
		stateChange[event.target.name] = values;
		this.setState(stateChange, function () {
			this.renderPageWrapper();
		});
	}

	generateFields() {
		const fields = this.getFields();
		let sectionSelectsByHeader = {};
		const fieldList = Object.keys(fields);
		for (let fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++) {
			let sectionSelects = [];
			const sectionList = fields[fieldList[fieldIndex]].sections;
			for (let sectionIndex = 0; sectionIndex < sectionList.length; sectionIndex++) {
				let selectOptions = [];
				const optionList = sectionList[sectionIndex].options;
				for (let optionIndex = 0; optionIndex < optionList.length; optionIndex++) {
					const fieldData = optionList[optionIndex];
					selectOptions.push(<option key={fieldData.label} value={fieldData.value}>{fieldData.label}</option>);
				}
				sectionSelects.push(
					<td key={fieldList[fieldIndex]}><select
						multiple={true}
						size={selectOptions.length}
						name={fieldList[fieldIndex]}
						value={this.state[fieldList[fieldIndex]]}
						onChange={this.handleOnChangeMulti}>{selectOptions}</select></td>
				);
			}
			const sectionHeader = fields[fieldList[fieldIndex]].heading;
			if (!sectionSelectsByHeader[sectionHeader]) {
				sectionSelectsByHeader[sectionHeader] = [];
			}
			sectionSelectsByHeader[sectionHeader].push(sectionSelects);
		}
		let sectionOutput = [];
		const headerList = Object.keys(sectionSelectsByHeader);
		for (let headerIndex = 0; headerIndex < headerList.length; headerIndex++) {
			sectionOutput.push(
				<td key={headerList[headerIndex]} valign='top'>
					<h2>{headerList[headerIndex]}</h2>
					<table border='0' cellSpacing='0' cellPadding='0'>
						<tbody><tr>{sectionSelectsByHeader[headerList[headerIndex]]}</tr></tbody>
					</table>
				</td>
			);
		}

		return (<table border='0' cellPadding='10' cellSpacing='0'><tbody><tr>{sectionOutput}</tr></tbody></table>);
	}

	handleOnChange = (event) => {
		let stateChange = {};
		stateChange[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
		this.setState(stateChange, function () {
			this.renderPageWrapper();
		});
	}

	renderPageWrapper() {
		renderPage(this.state);
	}

	render() {
		let output = (
			<div>
				<h1 style={{
					fontFamily: 'song',
				}}>Gomez Mix-aid</h1>
				<form style={{
					fontFamily: 'song',
				}}>
					Find cards that match <select name='connective' value={this.state.connective} onChange={this.handleOnChange}>
						<option value="AND">ALL</option>
						<option value="OR">ANY</option>
					</select> of the following attributes:
					{this.generateFields()}
					<input type="checkbox" name="artonly" checked={this.state.artonly} onChange={this.handleOnChange} /> display art only (instead of full card)<br /><br />
				</form>
			</div>
		);

		return output;
	}
}

// ========================================
function getMultiSelectFields() {
	const multiSelectFields = [
		'playlist',
		'level',
		'color',
		'yellowInstrument',
		'redInstrument',
		'blueInstrument',
		'greenInstrument',
	];
	return multiSelectFields;
}
function validateQuery(query) {
	let outQuery = {};
	const queryKeys = Object.keys(query);
	queryKeys.map((key, i) => {
		return outQuery[key] = query[key];
	});
	const multiSelectFields = getMultiSelectFields();
	for (let i = 0; i < multiSelectFields.length; i++) {
		if (outQuery[multiSelectFields[i]]) {
			if (typeof (outQuery[multiSelectFields[i]]) === 'string') {
				outQuery[multiSelectFields[i]] = [outQuery[multiSelectFields[i]]]
			}
		}
		else {
			delete outQuery[multiSelectFields[i]];
		}
	}
	return outQuery;
}

function convertQueryToAPIParams(query) {
	let params = {};
	const queryKeys = Object.keys(query);
	queryKeys.map((key, i) => {
		return params[key] = query[key];
	});
	if (params.color) {
		for (let i = 0; i < params.color.length; i++) {
			params[params.color[i]] = true;
		}
	}
	delete params.color;
	delete params.artonly;
	const paramsKeys = Object.keys(params);
	// don't bother passing empty value to API
	for (let i = 0; i < paramsKeys.length; i++) {
		const values = params[paramsKeys[i]];
		if (values && values.length === 1 && values[0] === "") {
			delete params[paramsKeys[i]];
		}
	}
	return params;
}

function renderPage(query) {
	if (query) {
		query = validateQuery(query);
		let apiParams = convertQueryToAPIParams(query);
		Request.get({
			url: process.env.REACT_APP_DATA_SERVER,
			qs: apiParams,
			headers: {
				"Content-Type": "application/json",
			},
			json: true,
		}, function (error, response, body) {
			if (response.statusCode === 200) {
				ReactDOM.render(
					<div>
						<UI query={query} />
						<Card cardData={body} query={query} />
					</div>,
					document.getElementById('root')
				);
			}
			else {
				console.log(body);
			}
		});
	}
	else {
		ReactDOM.render(
			<div>
				<UI query={{}} />
			</div>,
			document.getElementById('root')
		);
	}
}

// search prop includes '?' at the beginning, which we don't need
let queryparams = {};
if (window.location.search) {
	queryparams = QS.parse(window.location.search.substr(1));
}
const dataServer = process.env.REACT_APP_DATA_SERVER;
if (dataServer) {
	renderPage(queryparams);
}
else {
	ReactDOM.render(
		<div>
			Data server not specified.  Please ensure you have set REACT_APP_DATA_SERVER
	    </div>,
		document.getElementById('root')
	);
}